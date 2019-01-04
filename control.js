window.PagedConfig = {
    auto: false
};


document.addEventListener('DOMContentLoaded', function(){ 

    // hideBoringExcerpts();
    hydrateImages();
    hydrateImagesBBC();
    
    document.querySelectorAll(".paper-story").forEach(
        (s)=>footnoteLinks(s.id, s.id)
    );

    class MyHandler extends Paged.Handler {
        constructor(chunker, polisher, caller) {
            super(chunker, polisher, caller);
        }
        beforeParsed(content) {
            console.log("in beforeParsed");
        }

        afterPageLayout(pageFragment, page, breakToken) {
            let h = pageFragment.querySelector("h1.article-title");
            if(h !== null) {
                let pBox = page.element.getBoundingClientRect();
                let hBox = h.getBoundingClientRect();
                let pdelta = pBox.bottom - hBox.bottom;
                let botPC =  pdelta/pBox.height;
                if (botPC < 0.4) {
                    breakToken.offset  = 0;
                    // breakToken.node = h;
                    // h.parentElement.classList.add("break-before");
                    window.h = h;
                    window.p = page;
                    console.log("pageFragment", pageFragment, "page", page, "breakToken", breakToken);
                    console.log(h);
                    console.log(pdelta, botPC,"*****\n\n\n");
                }
                
            }
        }

        afterRendered(pages) {
            document.querySelector("body").classList = "";
        }
    }
    Paged.registerHandlers(MyHandler);

    setTimeout(function() {
              window.PagedPolyfill.preview();
            }, 1000);
});



function hydrateImages() {
    document.querySelectorAll("a").forEach((x) => {
        if (x.href.includes(".png") || x.href.includes(".jpg")) {
            if (x.innerText.length == 0) {
                let image = document.createElement("img");
                image.src = x.href;
                x.replaceWith(image);
            }
        }
    });
}

function hydrateImagesBBC() {
    /* <a data-replace-url=""
       data-anchor-title="(Credit: Wikimedia Commons)" 
       data-caption="Karl Maria Kertbeny created the label ’heterosexual&quot; (Credit: Wikimedia Commons)" 
       data-caption-title="" 
       data-replace-image="true" 
       data-is-portrait="false" 
       class="replace-image" 
       title="(Credit: Wikimedia Commons)" 
       href="http://ichef.bbci.co.uk/wwfeatures/wm/live/624_351/images/live/p0/4w/yq/p04wyqt2.jpg" 
       data-ref="d81a1b39-10c1-4a70-8d45-cb23bc56170a">
            View image of (Credit: Wikimedia Commons)
        </a> */
    document.querySelectorAll(".inline-media.inline-image a").forEach((x) => {
        if (x.href.includes(".png") || x.href.includes(".jpg")) {
            let image = document.createElement("img");
            image.src = x.href;

            let capText = x.dataset.caption.split("(Credit")[0]
            let caption = document.createElement("figcaption");
            caption.innerHTML = `${capText} &ndash;<cite>${x.title}</cite>`

            let fig = document.createElement("figure");
            fig.appendChild(image);
            fig.appendChild(caption);
            x.replaceWith(fig);
        }
    });
}

function hideBoringExcerpts() {
    document.querySelectorAll(".paper-story").forEach((x) => {
        let exerpt = x.querySelector(".excerpt").innerText;
        let firstP = x.querySelector("p").innerText;

        if ((exerpt == firstP) || firstP.includes(exerpt)) {
            console.info("boring:", exerpt);
            x.querySelector(".excerpt").classList.add("boring-hidden");
        }
    });
}
