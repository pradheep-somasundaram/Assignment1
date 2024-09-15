/* List of all handles to <div> tags in the HTML page */
var homepage = document.querySelector(".homePage"); // Handle to the homepage div
var add_Expense = document.querySelector(".addExpense"); // Handle to the add expense button/section
var delete_Expense = document.querySelector(".removeExpense"); // Handle to the remove expense button/section
var update_Expense = document.querySelector(".updateExpense"); // Handle to the update expense button/section
var view_list = document.querySelector(".viewList"); // Handle to the view list button/section

/* List of all the event listeners */
document.addEventListener("DOMContentLoaded", landing_page); // Call landing_page when the DOM is fully loaded
homepage.addEventListener("click", landing_page); // Call landing_page when the homepage is clicked
add_Expense.addEventListener("click", add_Expenses); // Call add_Expenses when the add expense button is clicked
delete_Expense.addEventListener("click", delete_Expenses); // Call delete_Expenses when the remove expense button is clicked
update_Expense.addEventListener("click", update_Expenses); // Call update_Expenses when the update expense button is clicked
view_list.addEventListener("click", display_Expenses); // Call display_Expenses when the view list button is clicked


/*
Class template for accepting a new Expense with title, description etc.
*/
class ListItem {
    constructor(ExpenseTitle, ExpenseDescription, ExpenseCategory, ExpenseAmount, ExpenseDate){
        this.ExpenseTitle = ExpenseTitle.value;
        this.ExpenseDescription = ExpenseDescription.value;
        this.ExpenseCategory = ExpenseCategory.value;
        this.ExpenseAmount = ExpenseAmount.value;
        this.ExpenseDate = ExpenseDate.value;
      }
}

/*
Landing Page
Hide all the unnecessary <div> of the SPA Application.
Display a Welcome Message.
/*Q1: Function to display only the tab that is selected in the navigation bar
Call this function from HTML (using onclick) with a different parameter depending on which nav button is pressed.
E.g., when Add is pressed, call showTab('Add')
Hidden property can be set using the syntax:
document.getElementById('Add').hidden = true
*/
function landing_page(){

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
    heading.innerHTML = "Home";

    homepage_div.innerHTML = "";
    homepage_div.append(heading); 
}

/* Add Expenses
Q2:  Listener for Add button. 
Write code to uniquely identify the addExpense in the HTML document using getElementbyID.
Attach an event listener to it.
Make the event listener call add() function defined above.
*/
function add_Expenses(){
    var addExpenseForm = document.getElementById("addExpenseForm");
    var list = document.getElementById("list");
    var homepage_div = document.getElementById("homepage");
    var remove_Expense = document.getElementById("removeExpenseForm");
    
    addExpenseForm.style.display = "block"; // Display the "Add Expense" form
    list.style.display = "none";
    remove_Expense.style.display = "none";
    homepage_div.style.display = "none";

    addExpenseForm.style.paddingLeft = "0%"; 
    addExpenseForm.style.height = "70%";
    
    var addExpenseButton = document.getElementById("add");

    /*Calling the adding expense function*/
    addExpenseButton.addEventListener("click", add_Expense_func);

    // Reseting form fields to empty after adding the Expense to list
    document.getElementById("ExpenseTitle").value = null;
    document.getElementById("ExpenseDescription").value = null;
    document.getElementById("ExpenseCategory").value = null;
    document.getElementById("ExpenseAmount").value = null;
    document.getElementById("ExpenseDate").value = null;
}

// This function Adds a new Expense to list
function add_Expense_func(){
    /*Get a handle to all the HTML fields on the Expense add page 
    */
    var ExpenseTitle = document.querySelector(".ExpenseTitle");
    var ExpenseDescription = document.querySelector(".ExpenseDescription");
    var ExpenseCategory = document.querySelector(".ExpenseCategory");
    var ExpenseAmount = document.querySelector(".ExpenseAmount");
    var ExpenseDate = document.querySelector(".ExpenseDate");

    /* Validate if any of the fields are empty */
    if (ExpenseTitle.value.trim() === '' ||
    ExpenseDescription.value.trim() === '' ||
    ExpenseCategory.value.trim() === '' ||
    ExpenseAmount.value.trim() === '' ||
    ExpenseDate.value.trim() === '') {
    
    alert("Please fill in all fields for the Expense.");
    return; // Exit the function without adding the Expense
}

    /*Create a new ListItem based on the fields. Add it to the list_array
    */
    var newListItem = new ListItem(ExpenseTitle, ExpenseDescription, ExpenseCategory, ExpenseAmount, ExpenseDate);
    list_array.push(newListItem) 
    

    /*To save list_array to persistent storage 
    */
    localStorage.setItem("Expenses", JSON.stringify(list_array));

    document.getElementById("ExpenseTitle").value = "";
    document.getElementById("ExpenseDescription").value = "";
    document.getElementById("ExpenseCategory").value = "";
    document.getElementById("ExpenseAmount").value = "";
    document.getElementById("ExpenseDate").value = "";

    alert("Expense added successfully!");

}

/*Q3: Function to Delete 
*/
function delete_Expenses(){

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

    removeExpenseForm.style.paddingLeft = "0%";
    removeExpenseForm.style.height = "50%";
    
    var deleteExpenseButton = document.getElementById("remove");
    deleteExpenseButton.addEventListener("click", delete_Expense_func);  

    // Resets the form fields to empty after adding Expense to list
    document.getElementById("ExpenseIdRemove").value = null;
}


function delete_Expense_func(){
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
Q3: Function to Update 
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
      document.querySelector(".newExpenseAmount").value = "";
      document.querySelector(".newExpenseDate").value = "";
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
  var ExpenseAmount = document.querySelector(".newExpenseAmount").value; 
  var ExpenseDate = document.querySelector(".newExpenseDate").value; 

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
  if (ExpenseAmount.trim() !== '' && ExpenseAmount !== list_array[indexToUpdate].ExpenseAmount) {
    list_array[indexToUpdate].ExpenseAmount = ExpenseAmount;
  }  
  if (ExpenseDate.trim() !== '' && ExpenseDate !== list_array[indexToUpdate].ExpenseDate) {
    list_array[indexToUpdate].ExpenseDate = ExpenseDate;
  }  

  //Adding the Items to the local storage
  localStorage.setItem("Expenses", JSON.stringify(list_array));

  //Success feedback
  alert("Expense updated successfully!");
  document.getElementById("ExpenseIdUpdate").value = null;
  document.querySelector(".newExpenseTitle").value = "";
  document.querySelector(".newExpenseDescription").value = "";
  document.querySelector(".newExpenseCategory").value = "";
  document.querySelector(".newExpenseAmount").value = "";
  document.querySelector(".newExpenseDate").value = "";
  
}

/* Display Expenses
Hide all the unnecessary <div> of the HTML page.
Create a new HTML table element in Javascript. 
Iterate through the list_array, add each element in the array to the Table element.
Finally, append the Table element to the "list_table_dom", where list_table_dom = document.getElementById("list");
*/
function display_Expenses(){

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

  // Create a heading element
  var heading = document.createElement("h1");
  heading.innerHTML = "List of Expenses added";

  var Table = document.createElement("table")
  var Row = Table.insertRow(0);      
  var Sno = Row.insertCell(0);
  var ExpenseTitle = Row.insertCell(1);
  var ExpenseDescription = Row.insertCell(2);
  var ExpenseCategory = Row.insertCell(3);
  var ExpenseAmount = Row.insertCell(4);
  var ExpenseDate = Row.insertCell(5);         

  //List of expenses table headers
  Sno.innerText =  "Id";
  ExpenseTitle.innerText = "Title";
  ExpenseDescription.innerText = "Description";
  ExpenseCategory.innerText = "Category";
  ExpenseAmount.innerText = "Amount";
  ExpenseDate.innerText = "Date";

  //Table styles
  Sno.style.backgroundColor = "darkslategrey";
  ExpenseTitle.style.backgroundColor = "darkslategrey";
  ExpenseDescription.style.backgroundColor = "darkslategrey";
  ExpenseCategory.style.backgroundColor = "darkslategrey";
  ExpenseAmount.style.backgroundColor = "darkslategrey";
  ExpenseDate.style.backgroundColor = "darkslategrey";

  Sno.style.color = "white";
  ExpenseTitle.style.color = "white";
  ExpenseDescription.style.color = "white";
  ExpenseCategory.style.color = "white";
  ExpenseAmount.style.color = "white";
  ExpenseDate.style.color = "white";

  list_table_dom.style.height = "70%"; 

  //Create local variable
  var new_list = list_array.slice();

  //Insert rows based on number of rows inserted
  for (var i = 0; i < new_list.length; i++) {
    var Expense = new_list[i];
    var row = Table.insertRow(i + 1);   
    var snoCell = row.insertCell(0);
    var ExpenseTitleCell = row.insertCell(1);
    var ExpenseDescriptionCell = row.insertCell(2);
    var ExpenseCategoryCell = row.insertCell(3);
    var ExpenseAmountCell = row.insertCell(4);
    var ExpenseDateCell = row.insertCell(5);

    //Assigning the values of the table into the table
    snoCell.innerText = i + 1; 
    ExpenseTitleCell.innerText = Expense.ExpenseTitle;
    ExpenseDescriptionCell.innerText = Expense.ExpenseDescription;
    ExpenseCategoryCell.innerText = Expense.ExpenseCategory;
    ExpenseAmountCell.innerText = Expense.ExpenseAmount;
    ExpenseDateCell.innerText = Expense.ExpenseDate;
  }


  /*Finally, add the newly created table to the list_table_dom */
  list_table_dom.innerHTML = "";
  list_table_dom.appendChild(heading); 
  list_table_dom.append(Table);

}



