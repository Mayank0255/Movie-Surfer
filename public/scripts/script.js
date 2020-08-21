const hoverPanelIn = id => {
    const parent = document.getElementById(id)
    parent.style.backgroundColor = '#00c8ff'
    const children = parent.getElementsByTagName('div')
    children[0].style.backgroundColor = '#001d26'
    children[1].style.backgroundColor = '#001d26'
}

const hoverPanelOut = id => document.getElementById(id).style.backgroundColor = null;

const hoverGenreIn = id => {
    const element = document.getElementById(id);
    element.getElementsByTagName('img')[0].style.border = '3px solid #00c8ff';
    element.getElementsByClassName('link')[0].getElementsByTagName('a')[0].style.color = '#00c8ff';
}

const hoverGenreOut = id => {
    const element = document.getElementById(id);
    element.getElementsByTagName('img')[0].style.border = null;
    element.getElementsByClassName('link')[0].getElementsByTagName('a')[0].style.color = '#ffffff';
}