var API = { c_status: "incomplete", c_time: "0", c_linkIds: "0", c_location: "0", c_lesson_mode: "normal", c_suspend_data: "", c_raw: "", c_lesson_progress: "", c_lesson_location: "", c_lesson_progress: "", c_session_time: "0" }

API.LMSInitialize = function (str) {
    API.c_linkIds = linkIds;

    $.getJSON("http://114.113.230.135:7066/User/common/ScormData.ashx?callback=?",
        { data: "get", nid: nid, cid: cid, uid: uid },
        function (rval) {
            API.LMSSetValue("cmi.core.lesson_progress", rval.lesson_progress);
            API.LMSSetValue("cmi.suspend_data", rval.suspend_data);
            API.LMSSetValue("cmi.core.session_time", rval.session_time);
            API.LMSSetValue("cmi.core.lesson_location", rval.lesson_location);
        }
    );
    //     
    //    if (typeof (localStorage.c_lesson_progress) != "undefined") {
    //        API.LMSSetValue("cmi.core.lesson_progress", localStorage.c_lesson_progress);
    //    }

    //    if (typeof (localStorage.c_suspend_data) != "undefined") {
    //        API.LMSSetValue("cmi.suspend_data", localStorage.c_suspend_data);
    //    }

    //    if (typeof (localStorage.c_session_time) != "undefined") {
    //        API.LMSSetValue("cmi.core.session_time", localStorage.c_session_time);
    //    }

    //    if (typeof (localStorage.c_lesson_location) != "undefined") {
    //        API.LMSSetValue("cmi.core.lesson_location", localStorage.c_lesson_location);
    //    }

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

function c_Exit_bak() {
    //    localStorage.c_suspend_data = API.c_suspend_data;
    //    localStorage.c_session_time = API.c_session_time;
    //    localStorage.c_lesson_location = API.c_lesson_location;
    //    localStorage.c_lesson_progress = API.c_lesson_progress;
    //$.post("http://114.113.230.142:8061/User/common/ScormData.ashx", { data:"set",suspend_data: API.c_suspend_data, session_time: API.c_session_time, lesson_location: API.c_lesson_location, lesson_progress: API.c_lesson_progress },
    //alert(API.c_suspend_data + "=======" + API.c_session_time + "===========" + API.c_lesson_location);
    $.getJSON("http://114.113.230.135:7066/User/common/ScormData.ashx?callback=?",
        { data: "set", suspend_data: API.c_suspend_data, session_time: API.c_session_time, lesson_location: API.c_lesson_location, lesson_progress: API.c_lesson_progress, nid: nid, cid: cid, uid: uid },
        function (rval) {
            if (rval.type == "true") {
                return true;
            } else {
                return false;
            }
        }
    );
}

function c_Exit() {
    SaveLerning();
}
function SaveLerning() {
    console.log("token", );
    var url = "http://120.92.36.69/api/b1/mobile/scorm/record-data";
    var pdata = {
        resId: '12',
        scoId: '12',
        attempt: '12',
        datalist: {
            'cmi.core.lesson_status': API.c_status,
            'cmi.suspend_data': API.c_suspend_data,
            'cmi.core.lesson_location': API.c_lesson_location,
            'cmi.core.session_time': API.c_session_time
        }
    };
    console.log("pdata", pdata);
    


    $.ajax({

        type: 'post',
        url: url,
        data:pdata,

        //	 方法二
         beforeSend: function(request) {
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

