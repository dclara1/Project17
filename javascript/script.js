/*  light dark mode */

const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');
function toggleMode() {
body.classList.toggle('dark-mode');

const modeMessage = body.classList.contains('dark-mode') ?
    'Dark Mode'
    : "Light Mode"

modeStatus.innerText = modeMessage;
  }

modeToggle.addEventListener('click', toggleMode);

/*  Animations  */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
    entry.target.classList.add('show');
  } else {
      entry.target.classList.remove('show');
  }    
  });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));


/* contact form validation */
function submitForm(e){
  e.preventDefault();
  
  
  var name = getInputVal ('name');
  var email = getInputVal ('email');
  var message = getInputVal ('message');
  
  if(name.lenth>=3){
      statusElm.append('Name is valid')
    }else {
      event.preventDefault()
      statusElm.append('Name is not valid')
    }
    
    if(email.lenth>5 && email.includes('@') &&email.includes('.')){
      statusElm.append('Email is valid')
    }else {
      event.preventDefault()
      statusElm.append('Email is not valid')
    }
    
    if(subject.lenth>=2){
      statusElm.append('Subject is valid')
    }else {
      event.preventDefault()
      statusElm.append('subject is not valid')
    }
    
    if(message.lenth>=15){
      statusElm.append('Message is valid')
    }else {
      event.preventDefault()
      statusElm.append('Message is not valid')
    }
}






/*  Setting up search and sort options for table   */

const search = document.querySelector('.input-group input'),
     searchButton = document.getElementById('searchButton'),
    table_rows = document.querySelectorAll('tbody tr'),
    table_headings = document.querySelectorAll('thead th');
;

// 1. Searching for specific data of HTML table
searchButton.addEventListener('click', searchTable);


function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();

        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })

    document.querySelectorAll('tbody tr:not(.hide)').forEach((visible_row, i) => {
        visible_row.style.backgroundColor = (i % 2 == 0) ? 'transparent' : '#0000000b';
    });
}

// 2. Sorting */

table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        table_rows.forEach(row => {
            row.querySelectorAll('td')[i].classList.add('active');
        })

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
})


function sortTable(column, sort_asc) {
    [...table_rows].sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
        .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}
