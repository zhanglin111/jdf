var API = { c_status: "incomplete", c_time: "0", c_linkIds: "0", c_location: "0", c_lesson_mode: "normal", c_suspend_data: "", c_raw: "", c_lesson_progress: "", c_lesson_location: "", c_lesson_progress: "", c_session_time: "0" }
var _resId = '990192C7-1F41-F4A2-8C1D-6D4E3A09C3D8';
var _scoId = '5F36C8FC-B6BC-900F-D9DE-91BD704947B3';
var _attempt = '';
var _get_record_dataUrl = "http://120.92.36.69/api/b1/mobile/scorm/get-record-data";
var _record_data = "http://120.92.36.69/api/b1/mobile/scorm/record-data";

API.LMSInitialize = function (str) {
    API.c_linkIds = linkIds;
    var url = _get_record_dataUrl;
    var pdata = {
        resId: _resId,
        scoId: _scoId,
        attempt: _attempt
    };
    console.log("pdata", JSON.stringify(pdata));
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pdata),
        beforeSend: function (request) {
            request.setRequestHeader('token', JSON.parse(localStorage.getItem("userInfo")).token);
        },
        success: function (res) {
            console.log(res);
            var result = JSON.parse(res);

            if (result.code == "0") {
                if (result.data.list.datalist["cmi.core.lesson_location"] != '' && result.data.list.datalist["cmi.core.lesson_location"] != undefined) {
                    API.LMSSetValue("cmi.core.lesson_location", result.data.list.datalist["cmi.core.lesson_location"]);
                }
                if (result.data.list.datalist["cmi.suspend_data"] != '' && result.data.list.datalist["cmi.suspend_data"] != undefined) {
                    API.LMSSetValue("cmi.suspend_data", result.data.list.datalist["cmi.suspend_data"]);
                }
                if (result.data.list.datalist["cmi.core.lesson_status"] != '' && result.data.list.datalist["cmi.core.lesson_status"] != undefined) {
                    API.LMSSetValue("cmi.core.lesson_status", result.data.list.datalist["cmi.core.lesson_status"]);
                }
                if (result.data.list.datalist["cmi.core.session_time"] != '' && result.data.list.datalist["cmi.core.session_time"] != undefined) {
                    API.LMSSetValue("cmi.core.session_time", result.data.list.datalist["cmi.core.session_time"]);
                }
            }
            else {
                alert(result.message)
            }
        }
    });


    return "true";
}

API.LMSSetValue = function (name, value) {
    //console.log("name=" + name + "---value" + value)
    if (name == "cmi.core.lesson_location") {
        API.c_lesson_location = value;
        //c_Exit();
    } else if (name == "cmi.core.lesson_status") {
        API.c_status = value;
    } else if (name == "cmi.core.session_time") {
        value = value.split(".")[0];
        API.c_session_time = value;
    } else if (name == "cmi.core.lesson_mode") {
        API.lesson_mode = value;
    } else if (name == "cmi.suspend_data") {
        API.c_suspend_data = value;
    } else if (name == "cmi.core.score.raw") {
        API.c_raw = value;
    } else if (name == "cmi.core.lesson_progress") {
        API.c_lesson_progress = value;
    }
    else if (name == "cmi.core.exit") {
        //alert("close");
        //c_Exit();
    }

    return "true";
}

API.LMSGetValue = function (name) {
    //console.log("LMSGetValue---" + name);
    if (name == "cmi.core.lesson_status") {
        //alert("return:cmi.core.lesson_status ---" + API.c_status);//1-2-3
        return API.c_status;
    } else if (name == "cmi.core.student_name") {
        //alert("return:cmi.core.student_name --- bill");
        return "bill";
    } else if (name == "cmi.core.lesson_location") {
        console.log("return:cmi.core.lesson_location --- 2");
        return API.c_lesson_location;
    } else if (name == "cmi.core.score.raw") {
        return API.c_raw;
    } else if (name == "cmi.core.lesson_mode") {
        return API.c_lesson_mode;
    } else if (name == "cmi.suspend_data") {
        return API.c_suspend_data;
    } else if (name == "cmi.core.session_time") {
        return API.c_session_time;
    } else if (name == "cmi.core.lesson_progress") {
        return API.c_lesson_progress;
    }
    return "";
}

API.LMSGetLastError = function () {
    return 0;
}

API.LMSCommit = function () {
    //alert("LMSCommit");
    //return c_Exit();
    return "true";
}

function c_Exit() {
    SaveLerning();
}
function SaveLerning() {

    var url = _record_data;
    var pdata = {
        resId: _resId,
        scoId: _scoId,
        attempt: _attempt,
        datalist: {
            'cmi.core.lesson_status': API.c_status,
            'cmi.suspend_data': API.c_suspend_data,
            'cmi.core.lesson_location': API.c_lesson_location,
            'cmi.core.session_time': API.c_session_time
        }
    };
    console.log("pdata", JSON.stringify(pdata));
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(pdata),
        //	 方法二
        beforeSend: function (request) {
            request.setRequestHeader('Token', JSON.parse(localStorage.getItem("userInfo")).token);
        },
        success: function (res) {
            console.log(res);
        }
    })
}

//�뿪�γ�
API.LMSFinish = function (Str) {
    alert("LMSFinish");
    return c_Exit();
    //alert("LMSFinish: " + API.c_status + " --- " + API.c_time + " --- " + API.c_linkIds + " --- " + API.c_location + " --- " + API.c_suspend_data);

    //    if (API.c_status == 'completed') {
    //        //document.getElementById(aa[1]).className = "no";
    //        //  alert("�������ݱ���ɹ����������������½�ѧϰ���߽����γ�");
    //    }
    return true;

}

API.LMSGetErrorString = function () {
    return 0;
}

API.LMSGetDiagnostic = function () {
    return "The vendor specific textual description that corresponds to the input error code";
}

