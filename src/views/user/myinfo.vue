<template>
  <transition name="slideright">
    <div>
      <div class="user imooc-container">
        <jdf-return white="gray"></jdf-return>个人设置
      </div>

      <div class="form-wrapper register-wrapper">
        <div class="input-line">
          <span class=" icon-name "></span>
          <input type="text" v-model="userinfo.name" placeholder="请输入姓名" />
        </div>
        <div class="input-line">
          <span class="icon-dw"></span>
          <input type="text" v-model="userinfo.company" placeholder="京东方" />
        </div>
        <div class="input-line">
          <span class="icon-e"></span>
          <input type="text" v-model="userinfo.email" placeholder="请输入邮箱" />
        </div>
        <div class="input-line sexgroup">
          <input type="radio" v-model="userinfo.gender" name="sex" value="male" checked /> &nbsp;男
          <input  style="margin-left: 40%" type="radio" v-model="userinfo.gender" value="female" name="sex" /> &nbsp;女
        </div>

        <div class="btn register-btn">
          <span class="modify" @click="update()">修&nbsp;&nbsp;&nbsp; 改</span>
        </div>
      </div>
      <div class="footerlink">
        <router-link class="xg-pwd" to="updatepwd">修改密码</router-link>
        <span class="red" @click="logout()">退出登录</span>
      </div>
    </div>
  </transition>
</template>

<script>
import back from "@/components/return";
export default {
  data() {
    return {
      userinfo: {
        name: "",
        gender: "",
        avatar: "",
        company: "",
        email: "",
        learningDuration: ""
      }
    };
  },
  methods: {
    //更新用户信息
    update() {
      this.axios
        .post("/api/b1/mobile/user/update", {
          realName: this.userinfo.name,
          company: this.userinfo.company,
          email: this.userinfo.email,
          gender: this.userinfo.gender
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    },
    //退出登录
    logout() {
      this.axios
        .post("/api/b1/mobile/user/logout")
        .then(res => {
          console.log(res);
          this.$storage.set("userInfo", {});
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        })
        .catch(error => {
          // 获取到拦截器中返回的错误信息
          this.$toast.show(error);
        });
    }
  },
  created() {
    this.axios
      .post("/api/b1/mobile/user/base")
      .then(res => {
        if (res.data.code == "0") {
          console.log(res.data.data.list);
          this.userinfo = res.data.data.list;
        } else {
          this.$toast.show(res.data.message);
        }
      })
      .catch(error => {
        // 获取到拦截器中返回的错误信息
        this.$toast.show(error);
      });
  },
  components: {
    "jdf-return": back
  }
};
</script>

<style lang="scss" scoped>
  .xg-pwd{
    color: #3458b4;
  }
  .red{
    color: #d50000;
  }
  .icon-name{
    width: 2rem;
    height: 2rem;
    background: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmM2Y2IxMjYtZmQ1OS1kYzQxLWFiMGMtMzUzYjhjMDdkOTRiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE0REJCOEMxMTEwOTExRUE4MDM5QUMzRUY2OTkwNjBEIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE0REJCOEMwMTEwOTExRUE4MDM5QUMzRUY2OTkwNjBEIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmNmU0YjZmLWMwNjUtMmY0ZC1iNjNmLTBmNThkMjc1NTViNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg5NzMxMjhmLTY0MTgtNGQ0OC1hZDYzLTkzOWI2MDJlMDdiZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAA8AEQMBEQACEQEDEQH/xACBAAEBAQAAAAAAAAAAAAAAAAAJBgcBAAIDAAAAAAAAAAAAAAAAAAUGAwQHEAABBAIBAwALAQAAAAAAAAABAgMEBREGBwASCCExQWETIxTUlRhYCREAAQIEAgcHBQAAAAAAAAAAAQIDABEhBEEFUWGBsdESEzGRoeFykgYiUxRUFf/aAAwDAQACEQMRAD8ARbz22zkDVeLKRWmTZtRWWluIu13FetbTzbJaUWWVOtkKbbdXkKIIyQE5wrBcPhltbv3SuqASEzSD2TnUyxI88IEZy64hoclATWMt/wA8tz5H2FW+1F9Z2N5plWzFdrplg64+Is9xagphh1wk4W3lSkA4GAcDuPcR+cWls101IAS4ZzlSadJ248IrZI64rmCiSkb4TjrPoYIG3lbmfzKu7jaJcbS9r1bQg6+iPTr1NTsNEFKiEGS7Lgu/EKkgFZUrtz6gB6OtTy3KsmbQgFxCnKV6lZ6gFCWrGFa5urxRJ5VBPpw2iI7j7l/zOq2K2dqGtbDc6xHeK0VcHT0GrfAV8xs/QwG8Z9pbUlXv6tXuV5KskOrSF6S59Q9yt8RMXV6mRSCR6aeAhAf2W5C/m/evxk/7TpK/gW/7TfuTxg1+e59pXceEf//Z") no-repeat ;
    background-size: 2rem 2rem;
  }
  .icon-dw{
    width: 2rem;
    height: 2.1rem;
    background: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmM2Y2IxMjYtZmQ1OS1kYzQxLWFiMGMtMzUzYjhjMDdkOTRiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCMURCREYxMTEwOTExRUFBRkY3OTdBRUVBQ0EyMkRDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCMURCREYwMTEwOTExRUFBRkY3OTdBRUVBQ0EyMkRDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmNmU0YjZmLWMwNjUtMmY0ZC1iNjNmLTBmNThkMjc1NTViNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg5NzMxMjhmLTY0MTgtNGQ0OC1hZDYzLTkzOWI2MDJlMDdiZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABIAEQMBEQACEQEDEQH/xACXAAADAQAAAAAAAAAAAAAAAAAGBwkIAQACAwEAAAAAAAAAAAAAAAADBgQFBwIQAAAGAAIDCREAAAAAAAAAAAECAwQFBgARMjQHIUESImIVNTYIUWHRUhMjM1OTRVXVFpYXN5cRAAECAgYHAw0AAAAAAAAAAAECAwARITFBYTIEURIiYpITM3EUBfCRscHRQlLSQ2OTNBX/2gAMAwEAAhEDEQA/ADM1snFJuHQWtnaAO3fVN3KySLN6sKismmJ+A5jyibI0YXIOEoOZgDfxr/dkBCiEZaYWAJgYdCvuXVQo8xWsKXMM67bt2Kv17avWo6u1tnL/AFI6k0oiPF85Rrk8/Ioodsmcxgct2KqauYjmJinHd388Zs/4a6txRTqAaxltoTabCoEeaGNGZSEgGc5Cwn1QQflmn+psn2vP/L8A/mPbnGj5oJ3lF/Cr2REc10qqE9CKK7U720JH057EvV2/B8oyenE4FimnG1E2eRsa4Mo6W1SZbM3ARePjO/ClzUBQ21YSOw6BdBBetl+0O6y+1i71x6mnXNnLGNcT5FXh0VCp80oreZSABA3FIO5mGAZPxHL5dDLLg2nCZUbxFMdvZdxwrWk0JlOm6FFzpJ/EXXtj+HFny06BEXWOmGVIa+9/TOsKaelpDpd/u4gIwjr1RIVX9OKAV7qF2oOpvRDL0GrdD+9OR4vIwlP/ALGU6mI9uL3PKuLpHTdw1D0Wxi/+SYa/zRVcEf/Z") no-repeat ;
    background-size: 2rem 2.1rem;
  }
  .icon-e{
    width: 2rem;
    height: 2rem;
    background: url("data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NmM2Y2IxMjYtZmQ1OS1kYzQxLWFiMGMtMzUzYjhjMDdkOTRiIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIxNEUzNkYxMTEwOTExRUE5ODAyRTVENTgzRjA0NDVFIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIxNEUzNkYwMTEwOTExRUE5ODAyRTVENTgzRjA0NDVFIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmFmNmU0YjZmLWMwNjUtMmY0ZC1iNjNmLTBmNThkMjc1NTViNCIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjg5NzMxMjhmLTY0MTgtNGQ0OC1hZDYzLTkzOWI2MDJlMDdiZCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAICAgICAgICAgIDAgICAwQDAgIDBAUEBAQEBAUGBQUFBQUFBgYHBwgHBwYJCQoKCQkMDAwMDAwMDAwMDAwMDAwBAwMDBQQFCQYGCQ0LCQsNDw4ODg4PDwwMDAwMDw8MDAwMDAwPDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAA8AEQMBEQACEQEDEQH/xACBAAEAAwAAAAAAAAAAAAAAAAAIBAUHAQACAwEAAAAAAAAAAAAAAAACBQMEBgcQAAEEAgIAAgsBAAAAAAAAAAMBAgQFBgcREgATITHRIjKT1FaWF1cYEQABAwIDBQcFAAAAAAAAAAABEQIDEgQAIVExQWEiUvCx0TITFBWSI1OTBf/aAAwDAQACEQMRAD8ASeCU95eYRD2/s/be0h4he21hEvbjHMgMFlEUM0gBmkRFEdXRSJ1RXi48p3rYrHcs6XeSxxzm1t4Ya2tBAcwGvIFAVHMND5tV25qFrnM9WR76SSqHZnpp3Yucuw8dhiuwcq1Du7a13j2uaubMss5n5QUtZMnRQqRkCvaIIXSOF4UpkejGpw1vdzuWRW11TLFHdW8IdIQAwMFQBPmcpKcGop3omZyxKxzopHkNBzqyXQa8Tg4/6R3l/Srj5qezw9+BsfxNxQ9/P1nG6aayDZmAUBo2R61fsjW1HMsw422rualKIsmTIO6ZIlHUphyntRVYNqqjBtRy9e/vIn/qwW11IscvpyuDala6tABSAEBaN53nVMXLV8sTeZlTQqIQnFdcTdgZrm2U62mxtSabLgeJLQmqckOC5qZWPmpDiI1Cm8srGCIFeXjkI9F+Nr+7V9AWVpBDcg3M9b6gW8rg+sEbMlIOwtTREwU8r3x/aZS1EOYpTtvwaP09efduCfl1H9Z40HyjOiT9b/DC/wBq7qb9Q8cf/9k=") no-repeat ;
    background-size: 2rem auto;
  }
.user {
  border-bottom: 1px solid #eff3f6;
  text-align: center;
  line-height: 2rem;
  font-size: 1.5rem;
}
.footerlink {
  display: flex;
  justify-content: space-between;
  margin: 3rem 5% 0 5%;
}
.form-wrapper {
  margin-top: 2rem;
  .sexgroup {
    display: flex;
    width: 50%;
    margin-top: 3rem;
    margin-left: 10%;
  }
  .input-line {
    display: flex;
    align-items: center;
    padding:0 3.5rem ;
    input[type="radio"] {
      width: 2rem;
    }
    input {
      width: 85%;
      border-bottom: 0.1rem solid #ebebeb;
      padding: 2rem 0;
    }
    span{
      margin-right: 2rem;
    }
  }
  .btn {
    width: 90%;
    text-align: center;
    color: #fff;
    height: 5rem;
    font-size: 1.8rem;
    line-height: 5rem;
    background-color: #3458b4;
    margin-top: 4rem;
    margin-left: 5%;
    border-radius: 0.4rem;
    clear: both;
  }
}
.forget {
  color: #787878;
  display: flex;
  justify-content: space-between;
}
.forget,
.to-login {
  font-size: 1.8rem;
  margin-top: 3rem;
}
.to-login {
  position: absolute;
  width: 100%;
  bottom: 4rem;
  left: 0;
}
</style>

