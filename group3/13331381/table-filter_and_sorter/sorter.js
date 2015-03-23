// make the tables sortable
function makeAllTablesSortable(tables) {
    var length = tables.length;
    for (var i = 0; i < length; i++) {
        makeTableSortable(tables[i]);
    }
    return tables;

    // make a table sortable
    function makeTableSortable(table) {
        var thds = table.rows[0].cells;
        for (var i = 0; i < thds.length; i++) {
            thds[i].onclick = function (a, b, c) {
                return function () {
                    changeClassName(a, b);
                    sortTable(a, b, c);
                }
            }(table, thds[i], i);
        }

        // compare function for sorting
        function compare(a, b, thd) {
            if (thd.className.search("descend") == -1) {
                return a < b;
            } else {
                return a >= b;
            }
        }

        // sort table by given the table, thead, and column
        function sortTable(table, thd, index) {
            var tbody = table.getElementsByTagName("tbody")[0];
            var trs = tbody.getElementsByTagName("tr");
            var match = table.getElementsByClassName("ismatch");

            for (var i = 0; i < trs.length - 1; i++) {      // sort algorithm
                if (match.length <= 0 || trs[i].className.search("ismatch") >= 0) {
                    for (var j = i+1; j < trs.length; j++) {
                        if (match.length <= 0 || trs[j].className.search("ismatch") >= 0) {
                            if (compare(trs[i].cells[index].innerHTML, trs[j].cells[index].innerHTML, thd)) {
                                var t = trs[i].innerHTML;
                                trs[i].innerHTML = trs[j].innerHTML;
                                trs[j].innerHTML = t;
                            }
                        }
                    }
                }
            }
        }

        // change className
        function changeClassName(table, thd) {
            var thds = table.getElementsByTagName("th");
            for (var i = 0; i < thds.length; i++) {
                if (thds[i] != thd)
                    thds[i].className = "no_active";
            }
            if (thd.className == "ascend") {
                thd.className = "descend";
            } else {
                thd.className = "ascend";
            }
        }
    }
}