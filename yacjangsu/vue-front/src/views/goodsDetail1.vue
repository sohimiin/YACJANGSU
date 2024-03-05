<template>
    <div class="con">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <div>
            <div class="goods-details">
                <div class="goods-image">
                    <img :src="goods.goods_img ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_img}`) : '/goodsempty.jpg'"
                        alt="상품 이미지">
                </div>
                <div class="goods-info">
                    <div class="category">{{ categoryType(goods.goods_category) }}</div>
                    <div class="header">
                        <h2>{{ goods.goods_name }}</h2>
                    </div>
                    <div class="hashtags">
                        <span class="hashtag">#{{ goods.goods_tag1 }}</span>
                        <span class="hashtag" v-if="goods.goods_tag2 !== null && goods.goods_tag2 !== ''">#{{
                            goods.goods_tag2 }}</span>
                        <span class="hashtag" v-if="goods.goods_tag3 !== null && goods.goods_tag3 !== ''">#{{
                            goods.goods_tag3 }}</span>
                    </div>
                    <div class="star-rating">
                        <div class="star-rating">
                            <div class="star" v-for="score in 5" :key="score">
                                <span v-if="score < totalScore + 1"><i class="fa fa-star"></i></span>
                                <span v-if="score >= totalScore + 1"><i class="fa fa-star-o"></i></span>
                            </div>
                            <router-link to="/">
                                <span style="padding-left: 5px;">({{ reviewCnt }}개)</span>
                            </router-link>
                        </div>
                    </div>
                    <div style="margin-top: -10px;"></div>
                    <hr>
                    <div style="margin-bottom: 13px;"></div>
                    <span style="font-weight: bold; font-size: 18px;">판매가</span><span style="padding-left: 15px;"></span>
                    <span style="font-weight: normal;">{{ formatPrice(goods.goods_price) }}</span><br>

                    <span style="font-weight: bold; font-size: 18px;">배송비</span><span style="padding-left: 15px;"></span>
                    <span style="font-weight: normal;" v-if="goods.goods_price >= 50000">무료</span>
                    <span style="font-weight: normal;" v-else>3000원 (50,000원 이상 구매 시 무료)</span>
                    <div style="margin-top: -8px;"></div>
                    <hr>


                    <div class="quantity-section">
                        <h3> 수량 :</h3>
                        <button class="quantity" @click="minus">-</button>
                        <input class="quantity_num" type="number" v-model="quantity" min="1" />
                        <button class="quantity" @click="plus(goods.goods_cnt)">+</button>
                        <p style="font-size: small;"> 재고 : {{ goods.goods_cnt }} 개</p>
                    </div>

                    <div id="app">
                        <p>예상 적립금: {{ formatPrice(goods.goods_price * quantity * 0.03) }}</p>
                        <h3 style="font-size: 1.3rem;">총 상품금액: {{ formatPrice(goods.goods_price * quantity) }}</h3>
                    </div>
                    <hr>
                    <div class="buttons">
                        <button class="add-to-like">
                            <font-awesome-icon :style="{ color: isFavorited ? '#9c0410' : 'gray' }" icon="heart"
                                @click="toggleFavorite" />
                        </button>

                        <router-link to="/">
                            <button class="add-to-cart" style="margin-left:5px" @click="showAlert">장바구니</button>
                        </router-link>
                        <router-link to="/order">
                            <button class="buy-now" style="margin-left:5px">바로구매</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px;"></div>

            <div class="teb">
                <div id="detail"><a :href="'http://localhost:8080/goods/goodsdetail/'+ goods.goods_no" style="text-decoration: none; color: #9c0410;">상세정보</a></div>
                <div id="review"><a style="text-decoration: none; color: #555;">리뷰</a></div>
                <div id="qna"><a :href="'http://localhost:8080/goods/goodsQna/'+ goods.goods_no" style="text-decoration: none; color: #555;">문의</a></div>
            </div>
            <div>
                <div class="section1">
                    <div class="image-container">
                        <img class="showstep1"
                            :src="goods.goods_content ? require(`../../../node-back/uploads/uploadGoods/${goods.goods_content}`) : '/goodsempty.jpg'"
                            alt="상품 이미지">
                    </div>
                </div>

                <div id="top_btn">
                    <a href="#top" class="show-top-button">
                        <font-awesome-icon icon="fa-solid fa-chevron-up" size="xl" style="color: #000000;" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

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
            quantity: 1,
            goods: {},
            isFavorited: false,
            like: 0,
            reviewList: [],
            totalScore: 4,
            totalScoreDem: 0,
            reviewCnt: 0,
            largeImg: '',
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        }
    },
    created() {
        this.getGoods();
        // this.getLike();
        // this.likeCheck();
        // this.getReviewList();
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async getGoods() {
            try {
                const goodsno = this.$route.params.goodsno;
                const response = await axios.get(`http://localhost:3000/goods/goodsDetail/${goodsno}`);
                this.goods = response.data[0];
            } catch (error) {
                console.error(error);
            }
        },
        // calTotalScore() {
        //     if (this.reviewList.length > 0) {
        //         this.reviewList.forEach((review) => {
        //             this.totalScoreDem += review.REVIEW_SCORE;
        //             this.reviewCnt++;
        //         });
        //         this.totalScoreDem /= this.reviewCnt;
        //         this.totalScoreDem = this.totalScoreDem.toFixed(1);
        //         this.totalScore = Math.round(this.totalScoreDem)
        //     }
        // },
        // async getReviewList() {
        //     try {
        //         const goodsno = this.$route.params.goodsno;
        //         const response = await axios.get(`http://localhost:3000/goods/getReview/${goodsno}`);
        //         this.reviewList = response.data;
        //         this.calTotalScore();
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }, // 리뷰 불러오기 추가
        // async likeCheck() {
        //     const user_no = this.user.user_no || null;
        //     const response = await axios.post(`http://localhost:3000/goods/likeCheck/${this.$route.params.goodsno}/${user_no}`);
        //     if (response.data.message === 'complete') {
        //         this.isLiked = response.data.isLiked;
        //     } else {
        //         this.isLiked = false;
        //     }
        // },
        // async getLike() {
        //     try {
        //         const goodsno = this.$route.params.goodsno;
        //         const response = await axios.get(`http://localhost:3000/goods/likeCount/${goodsno}`);
        //         this.like = response.data;
        //         if (this.like === null) {
        //             this.like = 0;
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
        // 이미지 함수 둘 추가
        showImg(imgSrc) {
            this.largeImg = imgSrc;
            this.showModal = true;
        },
        closeImg() {
            this.showModal = false;
        },
        minus() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },
        plus(goods_cnt) {
            if (this.quantity < goods_cnt) {
                this.quantity++;
            } else if (this.quantity + 1 > goods_cnt) {
                alert('구매가능수량을 초과했습니다');
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
        categoryType(socialType) {
            if (socialType === 1) {
                return '유산균';
            } else if (socialType === 2) {
                return '비타민';
            } else if (socialType === 3) {
                return '오메가';
            } else if (socialType === 4) {
                return '홍삼';
            } else if (socialType === 5) {
                return '기타';
            } else {
                return 'null';
            }
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

/* @font-face {
    font-family: 'SejonghospitalBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SejonghospitalBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
} */

@font-face {
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/earlyaccess/notosanskr.css');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'TheJamsil5Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2');
    font-weight: 800px;
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
    font-family: 'Noto Sans KR', sans-serif;
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
    margin-left: 40px;
}

.goods-info {
    display: inline;
    max-width: 800px;
    max-height: 560px;
    margin-left: 50px;
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
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-right: 10px;
}

.goods-info .header i {
    font-size: 2em;
}

/*해시태그*/
.hashtags {
    /* margin-bottom: 20px; */
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

.star-rating .fa-star {
    color: #ffc74f;
    padding-left: 5px;
}

.star-rating .fa-star-o {
    color: #ccc;
    padding-left: 5px;
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
    border: 1px solid #ececec;
    margin-right: 110px;
    margin-bottom: 14px;
}

/*수량버튼*/

.quantity-section h3 {
    margin-right: 15px;

}

/* .quantity-section {
    display: flex;
    font-size: 1vw;
    margin-top: 1vw;
    margin-bottom: 6vw;
} */
.quantity-section .quantity {
    width: 2vw;
    font-size: 1vw;
    max-width: 2.6vw;
    height: 1.8vw;
    max-height: 3.6vw;
    text-align: center;
    border-radius: 2px;
    /* border: 2px solid #9c0410; */
    background-color: #ededed;
    font-family: 'TheJamsil5Bold';
}


.quantity-section .quantity_num {
    font-size: 1vw;
    margin-right: -6px;
    margin-left: -7px;
    width: 2.5vw;
    height: 1.8vw;
    text-align: center;
    font-family: 'SejonghospitalBold';
    border: 1px solid #ededed;
    border-radius: 2px;
}

.quantity-section input:focus {
    outline: none;
}

.quantity-section {
    display: flex;
    font-size: 1rem;
    margin-top: 5px;
    margin-bottom: -4px;
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
    margin-top: -20px;
}

.buy-now,
.add-to-cart,
.add-to-like {
    margin-top: 20px;

}

.buy-now {
    width: 10vw;
    height: 2.9vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #9c0410;
    border: #9c0410;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
}

.add-to-cart {
    width: 10vw;
    height: 2.9vw;
    padding: 0.5vw 1vw;
    font-size: 1rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #424141;
    border-radius: 5px;
    cursor: pointer;
    /* margin-right: 1%; */
}

.add-to-like {
    width: 3vw;
    height: 2.9vw;
    padding: 0.5vw 0.3vw;
    font-size: 3rem;
    font-family: 'SejonghospitalBold';
    background-color: #fff;
    border: 2px solid #424141;
    border-radius: 5px;
    cursor: pointer;
    font-size: x-large;
    /* margin-right: 1%; */
    /* margin-left: -5px; */
}

/* .add-to-like:hover, */
.add-to-cart:hover,
.buy-now:hover {
    background-color: #848484;
}

.separator {
    width: 1400px;
    border: 1px solid #f0f0f0;
}

/* 상단탭 */
.teb {
    border-top: 2px solid #555;
    display: flex;
    height: 70px;
    width: 100%;
    font-size: 1.2rem;
    font-family: 'SejonghospitalBold';
}

.teb #detail {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-right: 1px solid #c8c7c7;
    cursor: pointer;
    /* margin-left: 10vw; */
}

.teb #review {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    border-right: 1px solid #c8c7c7;
    border-bottom: 1px solid #c8c7c7;

    /* margin-right: 10vw; */
}

.teb #qna {
    width: 50%;
    height: 105%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #c8c7c7;

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
    margin-top: 100px
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
</style>