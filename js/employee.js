getAllEmployees();
$('tbody').scrollTableBody();

function saveEmployee() {

    let name = $('#formControlInput2').val();
    let address = $('#formControlInput3').val();
    let mobile = $('#formControlInput4').val();
    
    $.ajax({
        method:"POST",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/employee/saveEmployee",
        async:true,
        data:JSON.stringify({
                "empId":"",
                "empName":name,
                "empAddress":address,
                "empMobNum":mobile
        }),
        success: function(data) {
            alert("Saved")
            getAllEmployees()
            clearInputs()
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    })
}

function updateEmployee() {

    let empId = $('#formControlInput1').val();
    let name = $('#formControlInput2').val();
    let address = $('#formControlInput3').val();
    let mobile = $('#formControlInput4').val();
    
    $.ajax({
        method:"PUT",
        contentType:"application/json",
        url:"http://localhost:8080/api/v1/employee/updateEmployee",
        async:true,
        data:JSON.stringify({
                "empId":empId,
                "empName":name,
                "empAddress":address,
                "empMobNum":mobile
        }),
        success: function(data) {
            alert("Updated")
            getAllEmployees()
            clearInputs()
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    })
}

function deleteEmployee() {

    let empId = $('#formControlInput1').val();
    
    $.ajax({
        method:"DELETE",
        url:"http://localhost:8080/api/v1/employee/deleteEmployee/"+empId,
        async:true,
        success: function(data) {
            alert("Deleted")
            getAllEmployees()
            clearInputs()
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    })
}

function getAllEmployees() {

    $.ajax({
        method:"GET",
        url:"http://localhost:8080/api/v1/employee/getAllEmployees",
        async:true,
        success: function (data) {
            if(data.code==="00") {
                $('#empTable').empty();
                for(let emp of data.content) {
                    let empId = emp.empId;
                    let name = emp.empName;
                    let address = emp.empAddress;
                    let mobile = emp.empMobNum;

                    var row = `<tr><td>${empId}</td><td>${name}</td><td>${address}</td><td>${mobile}</td></tr>`;
                    $('#empTable').append(row);
                }
            }
        },
        error: function(xhr, exception) {
            alert("Error")
        }
    })
}

$(document).ready(function () {
    $(document).on('click', '#empTable tr', function () {
        var col0 = $(this).find('td:eq(0)').text();
        var col1 = $(this).find('td:eq(1)').text();
        var col2 = $(this).find('td:eq(2)').text();
        var col3 = $(this).find('td:eq(3)').text();

        $('#formControlInput1').val(col0);
        $('#formControlInput2').val(col1);
        $('#formControlInput3').val(col2);
        $('#formControlInput4').val(col3);
    })
})

function clearInputs() {
    $('.form-control').val('');
}