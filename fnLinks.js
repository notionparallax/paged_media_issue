/*------------------------------------------------------------------------------
Function:       footnoteLinks()
Author:         Aaron Gustafson (aaron at easy-designs dot net)
Creation Date:  8 May 2005
Version:        1.3
Homepage:       http://www.easy-designs.net/code/footnoteLinks/
License:        Creative Commons Attribution-ShareAlike 2.0 License
                http://creativecommons.org/licenses/by-sa/2.0/
Note:           This version has reduced functionality as it is a demo of 
                the script's development
------------------------------------------------------------------------------*/
function footnoteLinks(containerID, targetID) {
    console.log("hey, about to footnote", containerID, targetID);
    if (!document.getElementById || 
        !document.getElementsByTagName ||
        !document.createElement) return false;
    if (!document.getElementById(containerID) ||
        !document.getElementById(targetID)) return false;
    var container = document.getElementById(containerID);
    if (container.classList.contains('noted')) {
        // console.log("already noted");
        return false;
    }
    var target    = document.getElementById(targetID);
    var h2        = document.createElement('h2');
    addClass.apply(h2, ['printOnly']);
    var h2_txt    = document.createTextNode('Links');
    h2.appendChild(h2_txt);
    var coll = container.getElementsByTagName('*');
    var ol   = document.createElement('ol');
    addClass.apply(ol, ['printOnly']);
    var myArr = [];
    var thisLink;
    var num = 1;
    for (var i=0; i<coll.length; i++) {
        var thisClass = coll[i].className;
        if ( coll[i].getAttribute('href') || coll[i].getAttribute('cite') ) { 
            thisLink = coll[i].getAttribute('href') ? coll[i].href : coll[i].cite;
            var note = document.createElement('sup');
            var classy = ['printOnly', ... Array.from(coll[i].classList)];
            classy.forEach(
                c=> note.classList.add(c)
            )
            // addClass.apply(note, c)
            var note_txt;
            var j = inArray.apply(myArr,[thisLink]);
            if ( j || j===0 ) {
                note_txt = document.createTextNode(j+1);
            } else {
                var li     = document.createElement('li');
                var li_txt = document.createTextNode(thisLink);
                li.appendChild(li_txt);
                ol.appendChild(li);
                myArr.push(thisLink);
                note_txt = document.createTextNode(num);
                num++;
            }
            note.appendChild(note_txt);
            if (coll[i].tagName.toLowerCase() == 'blockquote') {
                var lastChild = lastChildContainingText.apply(coll[i]);
                lastChild.appendChild(note);
            } else {
                coll[i].parentNode.insertBefore(note, coll[i].nextSibling);
            }
        }
    }
    target.appendChild(h2);
    target.appendChild(ol);
    // addClass.apply(document.getElementsByTagName('html')[0],['noted']);
    addClass.apply(container, ['noted']);
    return true;
}
