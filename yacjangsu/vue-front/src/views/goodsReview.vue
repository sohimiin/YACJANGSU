<template>
  <div class="con">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <div>
      <div class="goods-details">
        <div class="goods-image">
          <img src="../assets/00031.jpg">
        </div>
        <div class="goods-info">
          <div class="category">여긴 제품 카테고리가 들어갑니다 </div>
          <div class="header">
            <h2>여기에는 제품명이 들어갑니다</h2>
          </div>
          <div class="hashtags">
            <span class="hashtag">해시태그1</span>
            <span class="hashtag">해시태그2</span>
            <span class="hashtag">해시태그3</span>
          </div>
          <div class="star-rating">
            <div class="star">
              <span><font-awesome-icon icon="fa-solid fa-star" size="xs" style="color: #ffc74f;" /></span>
              <span><font-awesome-icon icon="fa-solid fa-star" size="xs" style="color: #ffc74f;" /></span>
              <span><font-awesome-icon icon="fa-solid fa-star" size="xs" style="color: #ffc74f;" /></span>
              <span><font-awesome-icon icon="fa-solid fa-star" size="xs" style="color: #ffc74f;" /></span>
              <span><font-awesome-icon icon="fa-solid fa-star" size="xs" style="color: #ffc74f;" /></span>
            </div>
            <span style="padding-left: 5px;"></span>
            <!-- <div class="rate">
                                  <span style="width: 95%"></span>
                              </div> -->
            <label class="avg">4.5</label>
            <a><label>후기
                (10)</label></a>
          </div>
          <hr>
          <div class="quantity-section">
            <h3> 수량 :</h3>
            <button class="quantity" @click="minus">-</button>
            <input class="quantity_num" type="number" v-model="quantity" min="1" />
            <button class="quantity" @click="plus(goods.goods_cnt)">+</button>
            <p style="font-size: small;"> 재고 : {{ goods.goods_cnt }} 개</p>
          </div>

          <div id="app">
            <h4>총 가격: {{ formatPrice(goods.goods_price * quantity) }}</h4>
            <p>예상 적립금: {{ formatPrice(goods.goods_price * quantity * 0.03) }}</p>
          </div>
          <hr>
          <div class="buttons">
            <button class="add-to-like">
              <font-awesome-icon :style="{ color: isFavorited ? '#9c0410' : 'gray' }" icon="heart"
                @click="toggleFavorite" />
            </button>
            <router-link to="/cart">
              <button class="add-to-cart" style="margin-left:10px">장바구니</button>
            </router-link>
            <router-link to="/order">
              <button class="buy-now" style="margin-left:10px">바로구매</button>
            </router-link>


          </div>
        </div>
      </div>
      <hr class="separator">
      <div class="teb">
        <div id="detail"><router-link to="/goods/goodsDetail"><a style="text-decoration: none; color: #000000;">상세
              정보</a></router-link></div>
        <div id="review"><router-link to="/goods/goodsReview"><a
              style="text-decoration: none; color: #9c0410;">리뷰</a></router-link></div>
        <div id="qna"><router-link to="/goods/goodsQna"><a
              style="text-decoration: none; color: #000000;">문의</a></router-link></div>
      </div>

      <div class="section2">
        <hr class="separator">
        <div style="padding: 16px">
          <div class="total_review">
            <div style="padding: 40px">
              <h4>전체 평점</h4>
              <div class="total_score">
                <h1>{{ totalScoreDem }}</h1>
                <p>({{ reviewCnt }}개)</p>
              </div>
              <div class="total_review_star">
                <div class="star" v-for="score in 5" :key="score">
                  <span v-if="score < totalScore + 1"><i class="fa fa-star"></i></span>
                  <span v-if="score >= totalScore + 1"><i class="far fa-star"></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>


      <div class="review">
        <hr style="margin: 15px 0px;">
        <div style="margin-left: 200px;">
          <div class="review_header">
            <div class="review1_img">
              <img src="../assets/00031.jpg" alt="...">
            </div>
          </div>

          <div class="review_profile">
            <div class="review_star">
              <div class="star">
                <!-- <span v-if="score < review.REVIEW_SCORE + 1"><i class="fa fa-star"></i></span>
                                            <span v-if="score >= review.REVIEW_SCORE + 1"><i class="far fa-star"></i></span> -->
              </div>
              <p>☆☆☆☆☆ (5)</p>
            </div>

            <div class="review_user_info">
              <p> 소민짱 | 2023-12-27 </p>
            </div>

          </div>
          <div class="review_body">
            <div class="review_content">
              <p> 정말 좋아요~ </p>
            </div>
          </div>
        </div>
      </div>
      <div class="review">
        <hr style="margin: 15px 0px">
        <div style="margin-left: 200px;">
          <div class="review_header">
            <div class="review1_img">
              <img src="../assets/00031.jpg" alt="...">
            </div>
          </div>

          <div class="review_box">
            <div class="review_star">
              <div class="star">
                <!-- <span v-if="score < review.REVIEW_SCORE + 1"><i class="fa fa-star"></i></span>
                                                <span v-if="score >= review.REVIEW_SCORE + 1"><i class="far fa-star"></i></span> -->
              </div>
              ☆☆☆☆☆ (5)
            </div>

            <div class="review_user_info">
              <p> 소민짱 | 2023-12-27 </p>
            </div>

          </div>
          <div class="review_body">
            <div class="review_content">
              <p> 정말 좋아요~ </p>
            </div>
          </div>
        </div>
      </div>
      <div class="review">
        <hr style="margin: 15px 0px">
        <div style="margin-left: 200px;">
          <div class="review_header">
            <div class="review1_img">
              <img src="../assets/00031.jpg" alt="...">
            </div>
          </div>

          <div class="review_profile">
            <div class="review_star">
              <div class="star">
                <!-- <span v-if="score < review.REVIEW_SCORE + 1"><i class="fa fa-star"></i></span>
                                                <span v-if="score >= review.REVIEW_SCORE + 1"><i class="far fa-star"></i></span> -->
              </div>
              ☆☆☆☆☆ (5)
            </div>

            <div class="review_user_info">
              <p> 소민짱 | 2023-12-27 </p>
            </div>

          </div>
          <div class="review_body">
            <div class="review_content">
              <p> 정말 좋아요~
                fkj;dbsfna;skjdB;sdkJVBsdkj;vbsdJK:Vbsd;kJVbSD:KJVbs;kjvbs;kdjvbsjk;vb;kjzvbk;jvbsKJ:DVbKJSD;VBSDKJ;VBSDKJVBSDK;JVBSDA;KJVBS;VKJBSDV;KJSBDV;KJ
              </p>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div id="top_btn">
      <a href="#top" class="show-top-button">
        <font-awesome-icon icon="fa-solid fa-chevron-up" size="xl" style="color: #000000;" />
      </a>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHeart)

export default {
  name: 'App',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      user: {},
      quantity: 1,
      goods: {
        goods_price: 30000,
        goods_cnt: 10,
        goods_hashtag1: '123',
        goods_hashtag2: '456',
        goods_hashtag3: '789'
      },
      isFavorited: false,
      totalScore: 1.5,
      reviewCnt: 10
    };
  },

  computed: {
    totalScoreDem() {
      return this.totalScore.toFixed(1);
    }
  },

  methods: {
    minus() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    plus(goods_cnt) {
      if (this.quantity < goods_cnt) {
        this.quantity++;
      }
    },
    toggleFavorite() {
      this.isFavorited = !this.isFavorited;
    },
    formatPrice(price) {
      if (price !== undefined) {
        const formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return `${formattedPrice} 원`;
      }
      return "";
    },

    async showAlert() {
      if (this.user.user_no === '') {
        this.$swal('로그인해주세요');
        this.$router.push({ path: '/login' });
      } else {
        this.$axios({
          url: "/",
          method: "POST",
          data: {
            // user_no: this.user.user_no,
            // basket_goods_price: this.goods.goods_price,
            // basket_goods_count: this.quantity,
            // basket_goods_nm: this.goods.goods_nm,
            // basket_goods_img: this.goods.goods_img,
            // basket_goods_no: this.goods.goods_no,
          },
        })
          .then(res => {
            if (res.data.message == 'check_error') {
              this.$swal("이미 장바구니에 담긴 상품입니다")
            }
            else {
              this.$swal({
                title: '상품이 장바구니에 담겼습니다.',
                showDenyButton: true,
                confirmButtonText: '장바구니로 이동',
                denyButtonText: `계속 쇼핑하기`,
              }).then((result) => {
                if (result.isConfirmed) {
                  location.href = "/"
                } else if (result.isDenied) {
                  location.reload();
                }
              })
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
  }
};
</script>

<style scoped>
@charset "UTF-8";

@font-face {
  font-family: 'ChosunCentennial';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/ChosunCentennial.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'seolleimcool-SemiBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/seolleimcool-SemiBold.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'SejonghospitalBold';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SejonghospitalBold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


:root {
  --app-container: #f7f8fa;
  /* --app-container: #f3f6fd; */
  --main-color: #1f1c2e;
  --secondary-color: #4A4A4A;
  --link-color: #1f1c2e;
  --link-color-hover: #c3cff4;
  --link-color-active: #fff;
  --link-color-active-bg: #1f1c2e;
  --projects-section: #fff;
  --message-box-hover: #fafcff;
  --message-box-border: #e9ebf0;
  --more-list-bg: #fff;
  --more-list-bg-hover: #f6fbff;
  --more-list-shadow: rgba(209, 209, 209, 0.4);
  --button-bg: #1f1c24;
  --search-area-bg: #fff;
  --star: #1ff1c2e;
  --message-btn: #fff;
}

/* 
  html, body {
    width: 100%;
    height: 100vh;
    margin: 0;
  } */

body {
  font-family: 'SejonghospitalBold';
  overflow: scroll;
  display: flex;
  justify-content: center;
  background-color: var(--app-container);
}

/*body 스크롤바*/
body::-webkit-scrollbar {
  width: 12px;
  height: 8px;
}

body::-webkit-scrollbar-track {
  background-color: rgb(218, 218, 218);
  border-radius: 10px;
}

body::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #9c0410;
}

body::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

/*내용 박스*/

.app-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--app-container);
  transition: 0.2s;
  max-width: 1800px;
}

.con {
  justify-content: space-between;
  align-items: center;
  flex: 2;
  background-color: var(--projects-section);
  border-radius: 32px;
  /* padding: 50px; */
  margin: 50px;
  display: flex;
  flex-direction: column;
}


/*상품 상세 설명 */

.goods-details {
  font-family: 'SejonghospitalBold';
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 10%;
}

.goods-image {
  display: inline;
  /* width: 100%; */
  /* max-width: 560px; */
  text-align: center;
  margin-right: 100px;
}

.goods-image img {
  width: 600px;
  border-radius: 40px;
  background-color: #eee;
}

.goods-info {
  display: inline;
  max-width: 800px;
  max-height: 560px;
  /* border: 1px solid rgb(0, 200, 130); */
}

.goods-info h2 {
  font-size: 2vw;
  margin-bottom: 10px;
}

.goods-info hr {
  margin-top: 20px;
}

.goods-info .category {
  font-size: 1rem;
  padding-bottom: 2px;
  color: #aaa;
  margin-bottom: 10px;
  margin-left: 3px;
}

.goods-info .header {
  display: flex;
  align-items: center;
  width: 500px;
}

.goods-info .header h2 {
  font-size: 2vw;
  margin-bottom: 10px;
  margin-right: 10px;
}

.goods-info .header i {
  font-size: 2em;
}

/*해시태그*/
.hashtags {
  margin-bottom: 20px;
  font-size: 14px;
}

.hashtag {
  display: inline-block;
  text-align: center;
  color: #9c0410;
  /* background-color: #f2f2f2; */
  border-radius: 5px;
  padding: 6px 6px;
}

/*리뷰 평점*/
.star-rating {
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  /* color: #ffc74f; */
}

.star {
  margin-top: 3px;
}

.checked {
  color: #ffc74f;
}

.fa-star-half {
  color: #ffc74f;
}

.star-rating label {
  display: flex;
  font-size: 16px;
  margin-top: 3px;
  margin-bottom: 10px;
  color: black;
  margin-left: 20px;
}

.star-rating .avg {
  display: flex;
  font-size: 15px;
  margin-top: 4px;
  margin-bottom: 10px;
  color: black;
  margin-left: 10px;
}

.rate {
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png) no-repeat;
  width: 121px;
  height: 20px;
  position: relative;
  color: #ffc74f;
}

.rate span {
  position: absolute;
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
  width: auto;
  height: 20px;
  color: #ffc74f;
}

p {
  margin: 20px 0 4px 0;
}

hr {
  border: 1px solid #f0f0f0;
}

/*수량버튼*/

.quantity-section h3 {
  margin-right: 10px;
}

.quantity-section {
  display: flex;
  font-size: 1vw;
  margin-top: 1vw;
  margin-bottom: 6vw;
}

.quantity-section .quantity {
  width: 4vw;
  font-size: 2vw;
  max-width: 3.6vw;
  height: 2.8vw;
  max-height: 3.6vw;
  text-align: center;
  border-radius: 4px;
  /* border: 2px solid #9c0410; */
  background-color: #fff;
}

.quantity-section .quantity_num {
  font-size: 1vw;
  width: 3vw;
  height: 2vw;
  text-align: center;
  margin-right: 4px;
  font-family: 'SejonghospitalBold';
  border: 2px solid #000;
  border-radius: 4px;
  margin-left: 4px;
}

.quantity-section input:focus {
  outline: none;
}

.quantity-section {
  display: flex;
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.quantity-section button {
  font-size: 1rem;
  padding: 0.3rem 0.6rem;
  margin: 0 0.3rem;
  border: none;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-section input {
  width: 5rem;
  padding: 0.3rem 0.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/*수량 버튼 숫자 가운데, 증감 버튼 없애기*/
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/*찜 장바구니 구매하기 버튼*/

.buttons {
  display: flex;
  margin-left: 10px;
}

.buy-now,
.add-to-cart,
.add-to-like {
  margin-top: 20px;

}

.buy-now {
  width: 10vw;
  height: 3vw;
  padding: 0.5vw 1vw;
  font-size: 1rem;
  font-family: 'SejonghospitalBold';
  background-color: #fff;
  border: 2px solid #9c0410;
  border-radius: 10px;
  cursor: pointer;
}

.add-to-cart {
  width: 10vw;
  height: 3vw;
  padding: 0.5vw 1vw;
  font-size: 1rem;
  font-family: 'SejonghospitalBold';
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 1%;
}

.add-to-like {
  width: 3vw;
  height: 3vw;
  padding: 0.7vw 0.3vw;
  font-size: 1rem;
  font-family: 'SejonghospitalBold';
  background-color: #fff;
  border: 2px solid #000;
  border-radius: 10px;
  cursor: pointer;
  font-size: larger;
  margin-right: 1%;
  margin-left: 20px;
}

.add-to-like:hover,
.add-to-cart:hover,
.buy-now:hover {
  background-color: #fff7f8;
}

.separator {
  width: 1400px;
  border: 1px solid #f0f0f0;
}

/* 상단탭 */
.teb {
  display: flex;
  height: 80px;
  width: 100%;
  font-size: 1.2rem;
  font-family: 'SejonghospitalBold';
}

.teb #detail {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-right: 1px solid #e6e6e6;
  cursor: pointer;
  /* margin-left: 10vw; */
}

.teb #review {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border-right: 1px solid #e6e6e6;
  color: #9c0410;
  /* margin-right: 10vw; */
}

.teb #qna {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  /* margin-right: 10vw; */
}

#detail.active,
#review.active {
  /* 활성화된 탭 아이템 스타일 */
  color: #9c0410;
  background-color: #ffffff;
}

.image-container {
  overflow: hidden;
}

.section1 img {
  width: 80vw;
  max-width: 900px;
  margin: 30px auto 0;
  display: flex;
  margin-bottom: 60px;
}

/* top_btn */
.show-top-button {
  display: scroll;
  width: 40px;
  height: 32px;
  text-align: center;
  font-size: 12px;
  /* font-family: GmarketSansMedium; */
  position: fixed;
  bottom: 60px;
  right: 4%;
  padding-top: 8px;
  cursor: pointer;
  border-radius: 20px;
  /* background-color: #9c0410; */
  z-index: 1;
  margin-right: 50px;
  text-decoration: none;
  font-size: large;
  color: #9c0410;
}

/* 전체평점박스 */

.total_review {
  font-family: 'SejonghospitalBold';
  max-width: 700px;
  height: 200px;
  margin: auto;
  margin-top: 30px;
  font-size: 20px;
  vertical-align: middle;
  border: 2px solid #9c0410;
  border-radius: 20px;
}

/* 전체평점 별 */
.rate {
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star_bg02.png) no-repeat;
  width: 121px;
  height: 20px;
  position: relative;
}

.rate span {
  position: absolute;
  background: url(https://aldo814.github.io/jobcloud/html/images/user/star02.png);
  width: auto;
  height: 20px;
}

/* 리뷰 */
.review_box {
  display: inline;
  padding-left: 8px;
}

.review_star {
  display: flex;
  font-size: 20px;
  margin: 6px;
  color: #9c0410;
}

.review_user_info {
  margin: 6px;
}

.review_user_info p {
  margin-top: 20px;
  font-size: 17px;
}

.review_content p {
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  max-width: 450px;
  margin: 10px;
  font-size: 17px;
  color: black;
  margin-bottom: 30px;
}

.review_content2 p {
  margin: 0px 10px;
  font-size: 14px;
  color: black;
}

.review {
  margin: auto;
  max-width: 900px;
}

.review_header {
  display: flex;
  padding: 10px 10px 0px 10px;
}

.review1_img img {
  margin: 0 auto;
  width: 70%;
}

.review_profile {
  display: inline;
  padding-left: 8px;
}


.review_body {
  display: flex;
}

.review_img {
  height: 130px;
  width: 130px;
  min-width: 130px;
  overflow: hidden;
  border-radius: 3px;
  margin: 0px 10px 10px 10px;
}

.review_img :hover {
  cursor: pointer;
}

.review_img img {
  object-fit: cover;
  width: 130px;
}

.total_score {
  margin: auto;
  display: flex;
}

.total_score p {
  font-size: 15px;
  margin: 23px 0px 0px 3px
}

.total_review_star {
  display: flex;
  color: #FFAF7D;
}
</style>
