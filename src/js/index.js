var w;
function launchWindows() {
  window.open('window-top-middle.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=0,left=600');
  window.open('window-middle-right.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=300,left=900');
  window.open('window-bottom-middle.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=600,left=600');
  window.open('window-middle-left.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=300,left=300');
  window.open('window-top-left.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=0,left=300');
  window.open('window-top-right.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=0,left=900');
  window.open('window-bottom-right.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=600,left=900');
  window.open('window-bottom-left.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=600,left=300');
  w = window.open('window-middle-middle.html', '', 'width=300,height=240,toolbar=no,scrollbars=no,location=no,top=300,left=600');
}

function logdom() {
    console.log($('#search-field', w.document).val());
}
