function Block( text, pos ) {
    this.text = document.createTextNode(text),
    this.elem = document.createElement('div'),
    this.position = pos;

    this.elem.appendChild(this.text);
    this.elem.classList.add('block');
    this.elem.classList.add('common');

    Block.prototype.add = function() {
        var codeContainer = document.getElementById('code');
        codeContainer.appendChild(this.elem);
        this.elem.classList.add('block');

    };
}

function test() {
    var blocks = document.querySelectorAll('.block'),
        lastIndex = 0,
        answer = true,
        current;

    [].forEach.call( blocks, function(block) {
        current = ~~block.dataset.index;
        if( current < lastIndex ) {
            answer = false;
        }
        lastIndex = current;
    });
    return answer;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function addEvents( node ) {

    node.addEventListener('dragstart', handleDragStart, false);
    node.addEventListener('dragenter', handleDragEnter, false);
    node.addEventListener('dragover', handleDragOver, false);
    node.addEventListener('dragleave', handleDragLeave, false);
    node.addEventListener('drop', handleDrop, false);
    node.addEventListener('dragend', handleDragEnd, false);
    node.addEventListener('dragenter', handleDragEnter, false);

}

function handleDragStart(e) {
    this.style.opacity = '0.6';  // this / e.target is the source node.
    dragSrc = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    if( e.stopPropagation ) {
        e.stopPropagation();
    }
    var empty = document.createElement('div'),
        content = document.createTextNode('Drag here!'),
        tempIndex = dragSrc.dataset.index;

    empty.appendChild(content);
    empty.classList.add('empty');
    empty.classList.add('block');
    addEvents(empty);

    if ( dragSrc != this && !this.classList.contains('source') ) {
        dragSrc.innerHTML = this.innerHTML;
        dragSrc.dataset.index = this.dataset.index;

        if ( dragSrc.classList.contains('nester') ) {
            var nester = document.createElement('div');
            var nestedEmpty = empty.cloneNode(true);
            addEvents(nestedEmpty);

            nester.classList.add('nested');
            nester.appendChild(nestedEmpty);
            insertAfter(this, nester);
        }

        if ( this.classList.contains('empty') ) {

            this.parentNode.appendChild(empty);
        }

        this.className = dragSrc.className;
        this.classList.remove('source');
        this.innerHTML = e.dataTransfer.getData('text/html');
        this.dataset.index = tempIndex;
        this.setAttribute('draggable', 'true');
    }



    return false;
}

function handleDragEnd(e) {
    this.style.opacity = '1';  // this / e.target is the source node.
    [].forEach.call(blocks, function(block) {
        block.classList.remove('over');
    });
}

var blocks = document.querySelectorAll('.block');
[].forEach.call(blocks, function(block) {
    addEvents(block);
});

/* parseo y envio */
var form = document.compile;

function handleSubmit( e ) {
    console.log(this.action);
    var answer = document.getElementById('answer'), 
        blocksToSend = document.querySelectorAll('.code .nester, .code .common'),
        responseContainer = document.getElementById('response');
        data = '',
        xhReq = new XMLHttpRequest();

    if( test() ) {
        answer.innerHTML = 'Correcto!';   
        answer.classList.remove('incorrect');
        answer.classList.add('correct');

    [].forEach.call(blocksToSend, function(block) {
        data = data + block.textContent.trim() + '\n'; 
    });

    xhReq.onreadystatechange = function() {
        if ( xhReq.readyState == 4 && xhReq.status == 200 ) {
            console.log(xhReq.responseText);
            responseContainer.innerHTML = xhReq.responseText;
        }
    }
    xhReq.open('POST', this.action + '/' + data, true);
    xhReq.send();

    } else {
        answer.innerHTML = 'Incorrecto!';
        answer.classList.remove('correct');
        answer.classList.add('incorrect');
    }
    e.preventDefault();

}

form.onsubmit = handleSubmit;

