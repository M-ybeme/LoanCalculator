function getValue(message){
    alert("Hello World!");
}

function getValue2()
{
    let msg = '';
    msg = document.getElementById("message").value;

    swal.fire(
    {
        backdrop: false,
        title: 'APP NAME',
        text: msg
        }
    )
}