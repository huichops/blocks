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
    empty.addEventListener('dragstart', handleDragStart, false);
    empty.addEventListener('dragenter', handleDragEnter, false);
    empty.addEventListener('dragover', handleDragOver, false);
    empty.addEventListener('dragleave', handleDragLeave, false);
    empty.addEventListener('drop', handleDrop, false);
    empty.addEventListener('dragend', handleDragEnd, false);
    empty.addEventListener('dragenter', handleDragEnter, false);
    
    if ( dragSrc != this && !this.classList.contains('source') ) {
        // dragSrc.innerHTML = this.innerHTML;
        
        this.classList.remove('over');
        this.innerHTML = e.dataTransfer.getData('text/html');
	this.setAttribute('draggable', 'true');
	console.log(this.classList);  
	if ( this.classList.contains('empty') ) {
	    this.classList.remove('empty'); 
	    this.parentNode.appendChild(empty);
        }
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
    block.addEventListener('dragstart', handleDragStart, false);
    block.addEventListener('dragenter', handleDragEnter, false);
    block.addEventListener('dragover', handleDragOver, false);
    block.addEventListener('dragleave', handleDragLeave, false);
    block.addEventListener('drop', handleDrop, false);
    block.addEventListener('dragend', handleDragEnd, false);
});


