$(function(){
    $.get('http://localhost:7709/paras', function(data){
        data.forEach(p => {
            $("#list").append("<li><b>" + p.data + "</b> | " + p.para + "</li>");
        })
    })

    $("#button").click(function(){
        $.post("http://localhost:7709/paras", $("form").serialize())
        alert('Record inserted: ' + JSON.stringify($("form").serialize()))
        $("#sentence").val("");
        location.reload();
    })

})