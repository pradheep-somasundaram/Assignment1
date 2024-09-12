/*List of all handles to <div> tags in the HTML page*/
var homepage = document.querySelector(".homePage");
var add_Expense = document.querySelector(".addExpense");
var remove_Expense = document.querySelector(".removeExpense");
var update_Expense = document.querySelector(".updateExpense");
var view_list = document.querySelector(".viewList");

/*List of all the event listeners */
document.addEventListener("DOMContentLoaded",landing_page);
homepage.addEventListener("click", landing_page);
add_Expense.addEventListener("click", add_Expenses);
remove_Expense.addEventListener("click", delete_Expenses);
update_Expense.addEventListener("click", update_Expenses);
view_list.addEventListener("click", display_Expenses);

/*Q7: Persistent Storage: Code to store the list of Expenses in localstorage of browser
      Right now, we start with an empty array. 
      For this Expense, you are supposed to edit the code to fetch the saved list of Expenses and populate list_array.
*/
// let list_array =  []; // internal array of all Expenses in list
// Code added in landing_page to load while DOMContentLoaded
/*End of Q7 */

/*
Class template for accepting a new Expense with title, description etc.
*/
class ListItem {
    constructor(ExpenseTitle, ExpenseDescription, ExpenseCategory, ExpenseComplexity){
        this.ExpenseTitle = ExpenseTitle.value;
        this.ExpenseDescription = ExpenseDescription.value;
        this.ExpenseCategory = ExpenseCategory.value;
        this.ExpenseComplexity = ExpenseComplexity.value;
    }
}

/*
Landing Page
Hide all the unnecessary <div> of the SPA Application.
Display a Welcome Message.
*/
function landing_page(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
    var addExpenseForm = document.getElementById("addExpenseForm");
    var list = document.getElementById("list");
    var removeExpenseForm = document.getElementById("removeExpenseForm");
    var homepage_div = document.getElementById("homepage");
    
    addExpenseForm.style.display = "none";
    list.style.display = "none";
    removeExpenseForm.style.display = "none";
    updateExpenseForm.style.display = "none";
    homepage_div.style.display = "block";

    // Initialize list_array from localStorage
    list_array = JSON.parse(localStorage.getItem("Expenses")) || [];

    var heading = document.createElement("h3");
    heading.innerHTML = "In learning, you will teach, and in teaching, you will learn!";

    /* End of Q1 */
    
    /*Q1: Create a new paragraph element using Javascript function. 
    Set the innerHTML of the paragraph to a welcome message. 
    Style it to your satisfaction (e.g., center it using padding left, padding top, center, etc.)
    Append it to the homepage_div*/

    homepage_div.innerHTML = "";
    homepage_div.append(heading); 
    /* End of Q1 */
}

/* Add Expenses
Hide all the unnecessary <div> of the HTML page.
Get inputs from the user, create a ListItem and add it to the list_array.
*/
function add_Expenses(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
    var addExpenseForm = document.getElementById("addExpenseForm");
    var list = document.getElementById("list");
    var homepage_div = document.getElementById("homepage");
    var remove_Expense = document.getElementById("removeExpenseForm");
    
    addExpenseForm.style.display = "block"; // Display the "Add Expense" form
    list.style.display = "none";
    remove_Expense.style.display = "none";
    homepage_div.style.display = "none";
    /* End of Q1 */

    addExpenseForm.style.paddingLeft = "30%"; 
    /* addExpenseForm.style.paddingTop = "10%"; */
    addExpenseForm.style.height = "50%";
    
    /*Q2: Get a handle to addExpense HTML element and create an event listener
    that calls the target function as add_Expense_func() below*/
    var addExpenseButton = document.getElementById("add");
    addExpenseButton.addEventListener("click", add_Expense_func);
    /*End of Q2 */

    // Resets the form fields to empty after adding Expense to list
    document.getElementById("ExpenseTitle").value = null;
    document.getElementById("ExpenseDescription").value = null;
    document.getElementById("ExpenseCategory").value = null;
    document.getElementById("ExpenseComplexity").value = null;
}

// Adds a new Expense to list
function add_Expense_func(){
    /*Get a handle to all the HTML fields on the Expense add page 
    */
    var ExpenseTitle = document.querySelector(".ExpenseTitle");
    var ExpenseDescription = document.querySelector(".ExpenseDescription");
    var ExpenseCategory = document.querySelector(".ExpenseCategory");
    var ExpenseComplexity = document.querySelector(".ExpenseComplexity");

    /*End of Q2 */

    /*Q8: Perform field validation (sanity check) on the HTML page.
          This can be coded later.
    */   
    /* Check if any of the fields are empty */
    if (ExpenseTitle.value.trim() === '' ||
    ExpenseDescription.value.trim() === '' ||
    ExpenseCategory.value.trim() === '' ||
    ExpenseComplexity.value.trim() === '') {
    
    alert("Please fill in all fields for the Expense.");
    return; // Exit the function without adding the Expense
}
    /*End of Q8 */

    /*Q2: Create a new ListItem based on the fields (e.g., ExpenseTitle, ExpenseDescription, etc.)
          Add it to the list_array
    */
    var newListItem = new ListItem(ExpenseTitle, ExpenseDescription, ExpenseCategory, ExpenseComplexity);
    list_array.push(newListItem) 
    
    /* End of Q2 */

    /*Q7: Write code to save list_array to persistent storage 
          This can be coded later.
    */
    localStorage.setItem("Expenses", JSON.stringify(list_array));
    /*End of Q7 */

    document.getElementById("ExpenseTitle").value = "";
    document.getElementById("ExpenseDescription").value = "";
    document.getElementById("ExpenseCategory").value = "";
    document.getElementById("ExpenseComplexity").value = "";

    alert("Expense added successfully!");

}

/* Delete Expenses
Hide all the unnecessary <div> of the HTML page.
Get the ID as an input from the user, search the list_array and delete the item.
*/
function delete_Expenses(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */

    if (list_array.length === 0) {
      alert("The list is empty. There are no Expenses to remove.");
      return;
    }

    var removeExpenseForm = document.getElementById("removeExpenseForm");
    var list = document.getElementById("list");
    var homepage_div = document.getElementById("homepage");
    var add_Expense = document.getElementById("addExpenseForm");
    
    list.style.display = "none";
    homepage_div.style.display = "none" ;
    add_Expense.style.display = "none";
    removeExpenseForm.style.display = "block";
    updateExpenseForm.style.display = "none";
    /* End of Q1 */
    removeExpenseForm.style.paddingLeft = "30%";
    removeExpenseForm.style.paddingTop = "10%"; 
    removeExpenseForm.style.height = "50%";
    
    /*Q4: Get a handle to removeExpense HTML element and create an event listener
    that calls the target function remove_Expense_func() below*/
    var deleteExpenseButton = document.getElementById("remove");
    deleteExpenseButton.addEventListener("click", remove_Expense_func);  
    /*End of Q4 */

    // Resets the form fields to empty after adding Expense to list
    document.getElementById("ExpenseIdRemove").value = null;
}


function remove_Expense_func(){
    /*Q8: Perform field validation (sanity check) on the list_array to check if it is not empty.
    */
    if (list_array.length === 0) {
      alert("The list is empty. There are no Expenses to remove.");
      return;
    }
    /*End of Q8 */

    /*Q4: Get the value of id (to be deleted) from the HTML page. 
          Search through the list_array and identify the index to be deleted.
    */
    var ExpenseIdInput = document.querySelector(".ExpenseIdRemove");
    var ExpenseIdValue = ExpenseIdInput.value;

    if (!/^[1-9]\d*$/.test(ExpenseIdValue)) {
      alert("Please enter a valid Expense ID.");
      document.getElementById("ExpenseIdRemove").value = "";
      return;
  }

    var indexToRemove = -1;
    if (ExpenseIdValue <= list_array.length) {
      indexToRemove = ExpenseIdValue-1; 
    }
    /*End of Q4 */
    
    /* Q4: Delete the item from the list_array.
           Hint: You can use the splice function for this.
    */
    if (indexToRemove != -1) 
    {
      list_array.splice(indexToRemove, 1); 
      /*Q7: Write code to save list_array to persistent storage 
      This can be coded later.
      */
      localStorage.setItem("Expenses", JSON.stringify(list_array));
      /*End of Q7 */
      document.getElementById("ExpenseIdRemove").value = "";
      alert("Expense deleted successfully!");
    }
    else{
      alert("Expense ID doesnot exist. Re-enter correct ID!");
    }
    /* End of Q4 */

}

/* Update Expenses
Hide all the unnecessary <div> of the HTML page.
Get the ID as an input from the user and validate it.
If the ID is valid, display the fields for updating the Expense.
*/
function update_Expenses(){
  
  if (list_array.length === 0) {
    alert("The list is empty. There are no Expenses to update.");
    return;
  }

  var updateExpenseForm = document.getElementById("updateExpenseForm");
  var list = document.getElementById("list");
  var homepage_div = document.getElementById("homepage");
  var add_Expense = document.getElementById("addExpenseForm");
  var removeExpenseForm = document.getElementById("removeExpenseForm");
  
  list.style.display = "none";
  homepage_div.style.display = "none" ;
  add_Expense.style.display = "none";
  removeExpenseForm.style.display = "none";
  updateExpenseForm.style.display = "block";
  document.getElementById("updateFields").style.display = "none";

  updateExpenseForm.style.height = "70%"; 
  
  // Hide the update fields initially
  document.getElementById("updateFields").style.display = "none";

  var checkIdButton = document.getElementById("UpdateId");
  checkIdButton.addEventListener("click", checkExpenseId);

}

function checkExpenseId() {

  var ExpenseIdInput = document.querySelector(".ExpenseIdUpdate");
  var ExpenseIdValue = ExpenseIdInput.value;

  if (!/^[1-9]\d*$/.test(ExpenseIdValue)) {
      alert("Please enter a valid Expense ID.");
      document.getElementById("ExpenseIdUpdate").value = "";
      return;
  }

  ExpenseIdValue = parseInt(ExpenseIdValue);

  if (ExpenseIdValue <= list_array.length) {
      document.getElementById("updateFields").style.display = "block";
      document.querySelector(".newExpenseTitle").value = "";
      document.querySelector(".newExpenseDescription").value = "";
      document.querySelector(".newExpenseCategory").value = "";
      document.querySelector(".newExpenseComplexity").value = "";
      var updateButton = document.getElementById("update");
      updateButton.addEventListener("click", update_Expense_func);
  } else {
      alert("Expense ID does not exist. Re-enter the correct ID.");
      document.getElementById("ExpenseIdUpdate").value = "";
      return;
  }

}

function update_Expense_func(){

  var ExpenseIdInput = document.querySelector(".ExpenseIdUpdate");
  var ExpenseIdValue = ExpenseIdInput.value;
  var indexToUpdate = ExpenseIdValue-1;

  var ExpenseTitle = document.querySelector(".newExpenseTitle").value;
  var ExpenseDescription = document.querySelector(".newExpenseDescription").value;
  var ExpenseCategory = document.querySelector(".newExpenseCategory").value;
  var ExpenseComplexity = document.querySelector(".newExpenseComplexity").value; 

  // Update the Expense object at the specified index if fields are not empty and if value is not same as existing value
  if (ExpenseTitle.trim() !== '' && ExpenseTitle !== list_array[indexToUpdate].ExpenseTitle) {
    list_array[indexToUpdate].ExpenseTitle = ExpenseTitle;
  }
  if (ExpenseDescription.trim() !== '' && ExpenseDescription !== list_array[indexToUpdate].ExpenseDescription) {
    list_array[indexToUpdate].ExpenseDescription = ExpenseDescription;
  }
  if (ExpenseCategory.trim() !== '' && ExpenseCategory !== list_array[indexToUpdate].ExpenseCategory) {
    list_array[indexToUpdate].ExpenseCategory = ExpenseCategory;
  }
  if (ExpenseComplexity.trim() !== '' && ExpenseComplexity !== list_array[indexToUpdate].ExpenseComplexity) {
    list_array[indexToUpdate].ExpenseComplexity = ExpenseComplexity;
  }  

  /*Q7: Write code to save list_array to persistent storage 
        This can be coded later.
  */
  localStorage.setItem("Expenses", JSON.stringify(list_array));
  /*End of Q7 */
  alert("Expense updated successfully!");
  document.getElementById("ExpenseIdUpdate").value = null;
  document.querySelector(".newExpenseTitle").value = "";
  document.querySelector(".newExpenseDescription").value = "";
  document.querySelector(".newExpenseCategory").value = "";
  document.querySelector(".newExpenseComplexity").value = "";
  
}

/* Display Expenses
Hide all the unnecessary <div> of the HTML page.
Create a new HTML table element in Javascript. 
Iterate through the list_array, add each element in the array to the Table element.
Finally, append the Table element to the "list_table_dom", where list_table_dom = document.getElementById("list");
*/
function display_Expenses(){
    /*Q1: Code to get a handle to all the <div> elements in the HTML page.
      Hide all the unnecessary <div> tags by setting e.g., list.style.display=none.
    */
  if (list_array.length === 0) {
    alert("The list is empty. There are no Expenses to display.");
    return;
  }
  var addExpenseForm = document.getElementById("addExpenseForm");
  var homepage_div = document.getElementById("homepage");
  var removeExpenseForm = document.getElementById("removeExpenseForm");
  var list_table_dom = document.getElementById("list");
  var updateExpenseForm = document.getElementById("updateExpenseForm");

  addExpenseForm.style.display = "none";
  list_table_dom.style.display = "block";
  removeExpenseForm.style.display = "none";
  updateExpenseForm.style.display = "none";
  homepage_div.style.display = "none" ;   
  /*End of Q1 */

  /*Q3: Create a new table element and insert the first row (i.e., table header).
    Hint: Use the insertCell function to do this.
    You can also set the style (e.g., backgroundColor, color etc.)        
  */
  // Create a heading element
  var heading = document.createElement("h1");
  heading.innerHTML = "List of Expenses added";

  var Table = document.createElement("table")
  var headerRow = Table.insertRow(0);      
  var snoHeader = headerRow.insertCell(0);
  var ExpenseTitleHeader = headerRow.insertCell(1);
  var ExpenseDescriptionHeader = headerRow.insertCell(2);
  var ExpenseCategoryHeader = headerRow.insertCell(3);
  var ExpenseComplexityHeader = headerRow.insertCell(4);         

  snoHeader.innerText = "Expense Id";
  ExpenseTitleHeader.innerText = "Expense Title";
  ExpenseDescriptionHeader.innerText = "Expense Description";
  ExpenseCategoryHeader.innerText = "Expense Category";
  ExpenseComplexityHeader.innerText = "Expense Complexity";

  snoHeader.style.backgroundColor = "darkslategrey";
  ExpenseTitleHeader.style.backgroundColor = "darkslategrey";
  ExpenseDescriptionHeader.style.backgroundColor = "darkslategrey";
  ExpenseCategoryHeader.style.backgroundColor = "darkslategrey";
  ExpenseComplexityHeader.style.backgroundColor = "darkslategrey";

  snoHeader.style.color = "white";
  ExpenseTitleHeader.style.color = "white";
  ExpenseDescriptionHeader.style.color = "white";
  ExpenseCategoryHeader.style.color = "white";
  ExpenseComplexityHeader.style.color = "white";
    
  list_table_dom.style.height = "70%"; 
  /*End of Q3 */

  /*Q3: create a new local variable that has the list of latest Expenses (i.e., list_array)*/
  var new_list = list_array.slice();
  /*End of Q3 */

  /*Q3: Iterate through latest_list_array and create the table.
        To create an empty row, use the function insertRow()
          Later, if you want to add 2 elements to this row, use insertCell(0), insertCell(1).
          Lookup the syntax and complete the code.
    */
  for (var i = 0; i < new_list.length; i++) {
    var Expense = new_list[i];
    var row = Table.insertRow(i + 1);   
    var snoCell = row.insertCell(0);
    var ExpenseTitleCell = row.insertCell(1);
    var ExpenseDescriptionCell = row.insertCell(2);
    var ExpenseCategoryCell = row.insertCell(3);
    var ExpenseComplexityCell = row.insertCell(4);
  
    snoCell.innerText = i + 1; 
    ExpenseTitleCell.innerText = Expense.ExpenseTitle;
    ExpenseDescriptionCell.innerText = Expense.ExpenseDescription;
    ExpenseCategoryCell.innerText = Expense.ExpenseCategory;
    ExpenseComplexityCell.innerText = Expense.ExpenseComplexity;
  }
  /*End of Q3 */

  /*Finally, add the newly created table to the list_table_dom */
  list_table_dom.innerHTML = "";
  list_table_dom.appendChild(heading); 
  list_table_dom.append(Table);

}



