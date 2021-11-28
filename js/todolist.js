$(function() {

    load();
    $("#title").on("keydown", function(event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("Please enter input");
            } else {
                var local = getDate();

                local.push({ title: $(this).val(), done: false });

                saveDate(local);

                load();
                $(this).val("");
            }
        }
    });
    // 3. toDoList delete specific item with id
    $("ol, ul").on("click", "a", function() {

        var data = getDate();

        // update data
        var index = $(this).attr("id");

        data.splice(index, 1);

        saveDate(data);

        load();
    });
    // 4. change status
    $("ol, ul").on("click", "input", function() {

        var data = getDate();

        var index = $(this).siblings("a").attr("id");

        data[index].done = $(this).prop("checked");

        saveDate(data);

        load();
    });
    // Get data from localStorage
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            // convert to object
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // Save data to localStorage
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }
    // get data and render data
    function load() {
        // get data
        var data = getDate();

        $("ol, ul").empty();
        var todoCount = 0; 
        var doneCount = 0; 

        $.each(data, function(i, n) {
            // console.log(n);
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p> <a href='javascript:;' id=" + i + " ></a></li>");
                todoCount++;
            }

        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

})