// Fetch Users 
async function fetchUsers() {
    try{
        const response = await fetch('../../data/employees.json');
        const users = await response.json();
        return users ;     

    } catch (error) {
        console.error("Error fetching users:", error);
    }  
    
}

// BUILD THE EMPLOYEES GRID
function buildGrid(users) {
    // GET DOM ELEMENTS
    let empTable    = document.querySelector('#employees')
    let empCount    = document.querySelector('#empCount')

    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
  
    //LOOP THORUGH FETCH USERS OBJECT AND BUILD THE ROW STRUCTURE
    for (let user of users) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.extension}</td>
            <td><a href="mailto:${user.email}">${user.email}</a></td>
            <td>${user.department}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    } 
  
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT USING EMPLOYEES LENGTH OBJECT
    empCount.value = users.length;   
   
}

//Export the init function for use in other modules
export async function init() {
    // FETCH USERS FROM JSON FILE
    const users = await fetchUsers();
    // CHECK IF USERS IS NOT EMPTY
    if (!users || users.length === 0) {
        console.error("No users found or unable to fetch users.");
        return;
    }
    // BUILD THE EMPLOYEES GRID
    buildGrid(users);
}
