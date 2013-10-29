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
    var empty = document.createElement('div');
    var content = document.createTextNode('Drag here!');

    empty.appendChild(content);
    empty.classList.add('empty');
    empty.classList.add('block');
    addEvents(empty);

    if ( dragSrc != this && !this.classList.contains('source') ) {
        // dragSrc.innerHTML = this.innerHTML;
        if ( dragSrc.classList.contains('nester') ) {
            console.log(this);
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
    // block.addEventListener('dragstart', handleDragStart, false);
    // block.addEventListener('dragenter', handleDragEnter, false);
    // block.addEventListener('dragover', handleDragOver, false);
    // block.addEventListener('dragleave', handleDragLeave, false);
    // block.addEventListener('drop', handleDrop, false);
    // block.addEventListener('dragend', handleDragEnd, false);
});


