function sdata(json, dataName, callback) {

    var data = JSON.parse(json)


    var size = $("[sdata^=" + dataName + "]").size();

    //这是启用自动克隆元素的处理位置

    function autoclone() {

        var siz = $("[clone]").size();
        for (var g = 0; g < siz; g++) {


            var firstDom = $("[clone]:eq(" + g + ")").clone();

            var childSize = firstDom.find("[sdata^=" + dataName + "]").size();

            var sdata = data;

            var returnDatalength;


            sdataSelect = firstDom.attr("sdata");

            selectArr = sdataSelect.split("-");

            if (selectArr.length > 1) {

                for (var x = 1; x < selectArr.length; x++) {
                    var select = selectArr[x];
                    if (select == "i") {
                        returnDatalength = sdata.length;
                    } else {
                        sdata = sdata[select];
                    }
                }

            } else {
                returnDatalength = sdata.length;
            }

            if (childSize > 1) {

                var dom, domAttr, reg;

                var parentdom = $("[clone]:eq(" + g + ")").parent();

                var newSdataAttr;

                for (var u = 0; u < returnDatalength; u++) {

                    dom = firstDom.clone();


                    for (var i = 0; i < childSize; i++) {

                        newSdataAttr = dom.find("[sdata^=" + dataName + "]:eq(" + i + ")").attr("sdata").split("-");


                        for (var f = 0; f < newSdataAttr.length; f++) {
                            if (newSdataAttr[f] == "i") {
                                newSdataAttr[f] = u;

                            }
                        }


                        newSdataAttr = newSdataAttr.join("-");

                        dom.find("[sdata^=" + dataName + "]:eq(" + i + ")").attr("sdata", newSdataAttr);


                        domAttr = dom.attr("sdata");
                        reg = /i$/gi;

                        domAttr = domAttr.replace(reg, u);

                        dom.removeAttr("clone");

                        dom.attr("sdata", domAttr)


                    }

                    parentdom.append(dom)


                }



            } else {

                for (var v = 0; v < returnDatalength; v++) {

                    dom = firstDom;
                    domAttr = dom.attr("sdata");
                    reg = /i$/gi;
                    domAttr = domAttr.replace(reg, u);
                    $("[clone]:eq(" + g + ")").parent().append(dom);

                }

            }

            $("[clone]:eq(0)").remove();




        }


        size = $("[sdata^=" + dataName + "]").size();
    }
    autoclone();

    //这是启用自动克隆元素的处理位置
    for (var j = 0; j < size; j++) {
        var Domname = $("[sdata^=" + dataName + "]:eq(" + j + ")").attr("sdata");
        // Datalist=Domname.split(",");


        var content = "";
        //判断数据选择器************************
        //for(var s=0;s<Datalist.length;s++){



        Domarr = Domname.split("-");
        if (Domarr.length > 1) {
            content = data;
            for (var x = 1; x < Domarr.length; x++) {
                var select = Domarr[x];

                content = content[select];
            }

        } else {
            content = data;
        }



        // }

        //判断数据选择器************************

        //判断属性选择器************************
        //typeof($temp)=="undefined"

        var Dom = $("[sdata^=" + dataName + "]:eq(" + j + ")");
        if (typeof(Dom.attr("ATTR")) == "undefined") {
            Dom.html(content);
        } else {
            if (Dom.attr("ATTR") !== "") {


                var attrlist = Dom.attr("ATTR").split(",");

                var returnData;

                var dataselect;

                for (var r = 0; r < attrlist.length; r++) {
                    select = attrlist[r].split(":");

                    dataselect = select[1].split("-");


                    if (dataselect.length > 1) {

                        returnData = content;
                        for (var p = 0; p < dataselect.length; p++) {
                            var arrselect = dataselect[p];
                            returnData = returnData[arrselect];
                        }

                    } else {

                        returnData = content[select[1]];
                    }


                    if (select[0] == "html") {
                        Dom.html(returnData);
                    } else {

                        Dom.attr(select[0], returnData);
                    }

                }
            }
            //判断属性选择器************************
        }
    }


    if (callback !== null) {
        callback(data);
    }
    //最后调用回调函数，可保证如果回调函数中重复对已经过Sdata处理的元素再次修改，以回调函数为准。


}

function sdata_get(url, dataName, callback = function() {}) {


    $.get(url, {}, function(json) {

        sdata(json, dataName, callback)

    })

}

function sdata_post(url, postdata, dataName, callback = function() {}) {

    $.post(url, postdata, function(json) {

        sdata(json, dataName, callback);

    });

}