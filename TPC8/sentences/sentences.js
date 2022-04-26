$(function(){
    $.get('http://localhost:7709/paras', function(data){
        data.forEach(p => {
            $("#list").append("<li><b>" + p.data + "</b> | " + p.para + "<button class=\"w3-button w3-teal\" id=\"editb\">edit</button>"+ "</li>");
        })
    })

    $("#button").click(function(){
        $.post("http://localhost:7709/paras", $("form").serialize())
        alert('Record inserted: ' + JSON.stringify($("form").serialize()))
        $("#sentence").val("");
        location.reload();
        console.log("123123")
    })

    $("#editb").click(function(){
        console.log("123123")
        alert('TSTE')
    })
    
})