/*
 * make all tables filterable
 */

// call function
window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

// get table elements from the web
function getAllTables() {
    return document.getElementsByTagName("table");
}

// make the table filterable
function makeAllTablesFilterable(tables) {
    var length = tables.length;
    for (var i = 0; i < length; i++) {
        makeATableFilterable(tables[i], i);
    }
    return tables;

    function makeATableFilterable(table, index) {
        var input = addInputElement(table);

        input.onchange = function(input, table) {
            return function () {
                var subText = input.value;
                if (subText != "") {
                    clearHighLight(table);
                    filterTable(table, subText);
                    changeCss(table, subText);
                }
            };
        }(input, table);

        function addInputElement(table) {
            var input = document.createElement("input");
            table.parentNode.insertBefore(input, table);
            return input;
        }

        function clearHighLight(table) {
            for (;;) {
                var highLight = table.getElementsByClassName("highLight");
                if (highLight.length <= 0) break;
                for (var i = 0; i < highLight.length; i++) {
                    var s = highLight[i].parentNode.innerHTML.replace(/<[^>]+>/g, "");
                    highLight[i].parentNode.innerHTML = s;
                }
            }
        }

        function filterTable(table, subText) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            for (var i = 0; i < trs.length; i++) {
                trs[i].className = "";      // clear classname
                if (trs[i].innerHTML.search(subText) == -1) {
                    // trs[i].style.display = "none";
                    trs[i].className = "nomatch";
                } else {
                    // trs[i].style.display = "table-row";
                    trs[i].className = "ismatch";
                }
            }
        }

        function changeCss(table, subText) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByClassName("ismatch");

            for (var i = 0; i < trs.length; i++) {
                highLight(trs[i], subText);
                if (i % 2 == 1) {
                    trs[i].className += " alternate";
                }
            }
        }

        function highLight(tr, subText) {
            var tds = tr.getElementsByTagName("td");
            for (var i = 0; i < tds.length; i++) {
                var td = tds[i].innerHTML;
                var index = td.indexOf(subText);
                if (index >= 0) {
                    tds[i].innerHTML = td.substring(0, index) + "<span class='highLight'>" + subText + "</span>" + td.substring(index+subText.length, td.length);
                }
            }
        }
    }
}