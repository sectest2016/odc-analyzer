function toggleTag(el){
    var btn = $(el);
    var tagId = parseInt(btn.attr("data-tag-id"));
    var libraryId = parseInt(btn.attr("data-library-id"));
    btn.attr({disabled: true});
    var add = !btn.hasClass("btn-success");
    var libraryTagPair = {tagId: tagId, libraryId: libraryId};
    $.ajax({
        url: add ? Routes.addTag : Routes.removeTag,
        method: 'POST',
        //dataType: 'json',
        data: JSON.stringify(
            add ? { libraryTagPair: libraryTagPair, contextDependent: false} : libraryTagPair
        ),
        contentType : 'application/json',
        success: function(){
            if(add){
                btn.addClass("btn-success");
            }else{
                btn.removeClass("btn-success");
            }
            btn.attr({disabled: false});
            //alert("SUCCESS "+add);
        },
        error: function(){
            alert("FAILED!");
            btn.addClass("btn-danger");
            // Can't enable the button as we can't be sure about the current state
        }/*,
        complete: function(a, b){
            console.log("complete", a, b);
            alert(["complete", a, b]);
        }*/
    });
}
function toggleClassified(el){
    var btn = $(el);
    var libraryId = parseInt(btn.attr("data-library-id"));
    btn.attr({disabled: true});
    var classifiedNewValue = !btn.hasClass("btn-success");
    $.ajax({
        url: Routes.controllers.Application.setClassified(classifiedNewValue).url,
        method: 'POST',
        contentType : 'application/json',
        data: ""+libraryId,
        success: function(){
            if(classifiedNewValue){
                btn.addClass("btn-success");
            }else{
                btn.removeClass("btn-success");
            }
            btn.attr({disabled: false});
        },
        error: function(){
            alert("FAILED!");
            btn.addClass("btn-danger");
        }
    });
}

function updatePosition(){
    // document.getElementById(…) is used over $('#'+…) in order to reduce attack surface: It does not look like a good idea to pass untrusted input to “omnipotent” `$` function.
    $.scrollTo(document.getElementById(location.hash.substr(1)), {offset: -$('#navbar').height()});
}
$(window).bind('hashchange', function(e) { updatePosition(); });
$(window).bind('load', function(e) { updatePosition(); });