module.exports = {

  // auth
  join: `INSERT INTO user (user_name, user_id, user_pw, user_email, user_birth, user_phone, user_zipcode, user_adr1, user_adr2) VALUES(?,?,?,?,?,?,?,?,?)`,

  id_check: `SELECT * FROM user WHERE user_id = ?`,
  phone_check: `SELECT * FROM user WHERE user_phone = ?`,
  get_user_no: `SELECT user_no FROM user WHERE user_id = ?`,
  login: `SELECT user_pw FROM user WHERE user_id = ?`,
  id_find: `SELECT * FROM USER WHERE user_name=? AND user_email = ? AND user_phone = ?`,
  pw_find: `SELECT * FROM USER WHERE user_name = ? AND user_id = ? AND user_email = ? AND user_phone = ?`,
  pw_uprandom: `UPDATE USER SET user_pw = ? WHERE user_id = ?`,
  event: `UPDATE USER SET user_point = ?, user_doevent = ? WHERE user_no = ?`,
  //카카오 로그인
  kakaoJoin: `INSERT INTO user (user_id, user_name, user_email, user_social_type) VALUES(?,?,?,1)`,
  kakao_check: `SELECT * FROM user WHERE user_id = ?`,
  //네이버 로그인
  naverlogin: `INSERT INTO user (user_email, user_id, user_name, user_social_type) VALUES (?, ?, ?, 2)`,
  naver_id_check: `SELECT * FROM user WHERE user_id = ?`,

  // 관리자
  admin_check: `SELECT user_type FROM user WHERE user_no = ?`,
  userlist: `SELECT user_no, user_id, user_name, user_email, user_point, user_social_type, user_date 
                  FROM user
                  WHERE user_type = 0 ORDER BY user_no DESC LIMIT ? OFFSET ?`,
 user_list: `SELECT user_no, user_id, user_name, user_email, user_point, user_social_type, user_date 
                  FROM user
                  WHERE user_type = 0`,
  usercnt: `SELECT COUNT(*) FROM user;`,
  deleteUser: `DELETE FROM user WHERE user_no = ?`,

  goods_add: `INSERT INTO goods (goods_name, goods_category, goods_price, goods_tag1, goods_tag2, goods_tag3, goods_cnt, goods_img, goods_content) VALUES (?,?,?,?,?,?,?,?,?)`,
  add_image: `UPDATE goods SET goods_img = ?, goods_content = ? WHERE goods_no = ?`,
  goods_check: `SELECT * FROM goods WHERE goods_name = ?`,
  get_goods_no: `SELECT goods_no FROM goods WHERE goods_name = ?`,
  delete_goods: `DELETE FROM goods WHERE goods_name = ?`,
  delete_goods_2: `DELETE FROM goods WHERE goods_no = ?`,
  get_img_nm: `SELECT goods_img, goods_content FROM goods WHERE goods_no = ?`,

  admin_orderlist: `SELECT * FROM orders o JOIN orders_detail od ON o.ORDERS_NO = od.ORDERS_NO JOIN user u ON u.USER_NO = o.USER_NO`,
  order_status_update: `UPDATE orders SET ORDERS_STATUS = ? WHERE ORDERS_NO IN (?)`,

  // 상품
  goods_list: `SELECT goods_no, goods_category, goods_name, goods_img, goods_price, goods_tag1, goods_tag2, goods_tag3, goods_cnt
                  FROM goods`,
  goods_list2: `SELECT goods_no, goods_category, goods_name, goods_img, goods_price, goods_tag1, goods_tag2, goods_tag3, goods_cnt
  FROM goods LIMIT ? OFFSET ?`,
  goodscnt: `SELECT COUNT(*) FROM goods;`,
  update_goods: `UPDATE goods
                SET goods_name = ?, goods_category = ?, goods_price = ?, goods_tag1 = ?, goods_tag2 = ?, goods_tag3 = ?, goods_cnt = ?
                WHERE goods_no = ?`,
  goods_catelist: `SELECT goods_category, goods_no, goods_name, goods_img, goods_price, goods_tag1, goods_tag2, goods_tag3
                       FROM goods
                       WHERE goods_category = ?`,
  goods_searchlist: `SELECT goods_category, goods_no, goods_name, goods_img, goods_price, goods_tag1, goods_tag2, goods_tag3
                       FROM goods `,
  get_goods_info: `SELECT goods_no, goods_category, goods_name, goods_price, goods_img, goods_content, goods_tag1, goods_tag2, goods_tag3, goods_cnt
                       FROM goods
                       WHERE goods_no = ?`,
  goods_detail: `SELECT goods_no, goods_name, goods_img, goods_category, goods_content, goods_price, goods_tag1, goods_tag2, goods_tag3, goods_cnt
                       FROM goods
                       WHERE goods_no = ?`,
  goods_list_best: `SELECT goods_no, goods_category, goods_name, goods_img, goods_price, goods_tag1, goods_tag2, goods_tag3, goods_cnt
  FROM goods order by goods_cnt ASC`,
//장바구니
addCart: `INSERT INTO CART(USER_NO, GOODS_NO, CART_GOODS_CNT) 
          VALUE(?,?,?)`,

orderDeli : `INSERT INTO DELI(deli_name, deli_phone, deli_zipcode, deli_adr1, deli_adr2, deli_memo, user_no) 
              VALUE(?,?,?,?,?,?,?)`,
cartList: `SELECT * FROM CART(user_no, goods_no, cart_goods_cnt) 
              WHERE goods_no = ?`,

cartInfo : `select g.GOODS_NAME, g.GOODS_PRICE, g.GOODS_IMG, uc.CART_GOODS_CNT, uc.GOODS_NO 
            from (select * from cart c where c.USER_NO = ? ) uc join goods g on uc.GOODS_NO = g.GOODS_NO`,
cart_update:`UPDATE cart SET CART_GOODS_CNT = ? WHERE user_no = ? and goods_no = ?`,
cart_delete:`DELETE FROM cart WHERE user_no = ? and goods_no = ?`,
like_addCart: `INSERT INTO CART(USER_NO, GOODS_NO, CART_GOODS_CNT) 
          VALUE(?,?,1)`,

//결제
orders_order: `insert into orders (user_no, orders_goods_cnt, orders_amt, orders_total, orders_delivery, orders_payment, orders_discount, orders_type, deli_no) values (?,?,?,?,?,?,?,?,?)`,

// goods_main: `SELECT * FROM GOODS WHERE GOODS_NO = ?`,
// goods_main: `SELECT g.*, t.total_orders
//                 FROM GOODS g
//                 INNER JOIN (
//                   SELECT od.GOODS_NO, COUNT(*) AS total_orders
//                   FROM ORDER_DETAIL od
//                   INNER JOIN GOODS g ON od.GOODS_NO = g.GOODS_NO
//                   WHERE g.GOODS_CATEGORY IN (1, 2, 3, 4, 5) 
//                   GROUP BY od.GOODS_NO
//                   ORDER BY total_orders DESC
//                 ) AS t ON g.GOODS_NO = t.GOODS_NO;`,
  // order_payment: `INSERT INTO order
  //                    (order_nm, order_adr1, order_adr2, order_zipcode, order_mobile, order_memo, order_amt, order_dc, order_delivery, order_total, user_no, order_tp)
  //                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
  // order_payment_detail: `INSERT INTO order_detail (ORDER_TRADE_NO, GOODS_NO, ORDER_GOODS_NM, ORDER_GOODS_PRICE, ORDER_GOODS_IMG, ORDER_GOODS_CNT)
  //                     VALUES (?, ?, ?, ?, ?, ?)`,
  // order_goods_cnt: `UPDATE goods SET goods_cnt = goods_cnt - ? WHERE goods_no = ?`,
  // order_usepoint: `UPDATE user SET user_point = user_point - ? WHERE user_no = ?`,
  orderlist: `SELECT *
                  FROM orders_detail od
                  JOIN orders o ON od.ORDERS_NO = o.ORDERS_NO
                  WHERE o.user_no =?`,
  orderlist2: `SELECT * FROM orders o JOIN orders_detail od ON o.ORDERS_NO = od.ORDERS_NO JOIN user u ON u.USER_NO = o.USER_NO LIMIT ? OFFSET ?`,
  ordercnt: `SELECT COUNT(*) FROM goods;`,
  delivery: `SELECT * FROM deli WHERE ORDERS_NO = ?`,
  ordergoods_detail: `SELECT * FROM orders_detail JOIN goods ON orders_detail.goods_no = goods.goods_no WHERE orders_detail.ORDERS_NO = ?`,
  orderlist_o_detail: `SELECT * FROM orders JOIN user ON orders.user_no = user.user_no WHERE ORDERS_NO = ?`,
  orderlist_d_detail: `SELECT * FROM orders_detail WHERE ORDERS_NO = ?`,
  myordercnt: `SELECT COUNT(*) FROM orders WHERE USER_NO = ?;`,
  mydelicnt: `SELECT COUNT(ORDERS_STATUS) FROM orders WHERE USER_NO = ?;`,

  //적립금 관련
  confirm_point: `UPDATE USER
                    SET user_point = user_point + (SELECT (ORDER_TOTAL * 0.03) FROM ORDER WHERE ORDERS_NO = ?)
                    WHERE user_no = ?`,
  cancel_point: `UPDATE USER SET user_point = user_point + ? where user_no = ?`,
  // cancel_goods: `UPDATE goods SET goods_cnt = goods_cnt + ? where goods_no = ?`,
  check_review: `UPDATE orders_detail
                  SET REVIEW_CHECK = 1
                  WHERE ORDERS_NO = ?`,
check_review2: `UPDATE orders_detail
                  SET REVIEW_CHECK = 0
                  WHERE ORDERS_NO = ?`,
  goods_get_review: `SELECT * FROM review rv 
                        JOIN user us LEFT OUTER JOIN user ur ON (us.user_no = ur.user_no) 
                        WHERE rv.user_no = us.user_no AND rv.goods_no = ?`,

  // cart_insert: `INSERT INTO cart
  //                 (user_no, basket_goods_price, basket_goods_count, basket_goods_nm, basket_goods_img, basket_goods_no)
  //                 VALUE (?,?,?,?,?,?)`,
  // cart_delete: `DELETE FROM cart WHERE basket_no = ?`,
  // cart_check: `SELECT * FROM cart WHERE user_no = ? AND basket_goods_no = ?`,
  // cart_list: `SELECT * from cart WHERE user_no = ? `,
  // cart_update: `UPDATE cart 
  //                   SET basket_goods_count = ?, basket_check = 1
  //                   WHERE basket_no = ?`,
  // cart_tp: `SELECT * from cart WHERE user_no = ? and cart_check = 1`,
  // cart_cancel: `UPDATE cart SET basket_check = 0 WHERE user_no = ?`,
  // cart_success: `DELETE FROM cart WHERE cart_check = 1 AND user_no = ?`,

  // 좋아요(찜) 기능

  like_insert: `INSERT INTO likes (user_no, goods_no) VALUES (?,?)`,
  like_delete: `DELETE FROM likes WHERE user_no = ? AND goods_no = ?`,
  like_check: `SELECT * FROM likes WHERE user_no = ? AND goods_no = ?`,
  like_count: `SELECT COUNT(*) FROM likes WHERE goods_no = ?`,
  like_list: `SELECT l.*, g.goods_name, g.goods_price, g.goods_img
               FROM likes l
               JOIN goods g ON l.goods_no = g.goods_no
               WHERE l.user_no = ?`,

//마이페이지
  get_user_info: `SELECT user_id, user_name, user_email, user_birth ,user_phone, user_zipcode, user_adr1, user_adr2, user_point, user_doevent
    FROM user
    WHERE user_no = ?`,
  get_order_box: `SELECT count(orders.orders_no) as order_cnt 
  FROM user JOIN orders ON user.user_no = orders.user_no
  WHERE user.user_no = ?`,
  get_deli_box: `SELECT count(orders.orders_status) as deli_cnt 
  FROM user JOIN orders ON user.user_no = orders.user_no
  WHERE orders.orders_status=3 AND user.user_no = ?`,
  // get_delivery_count: `SELECT COUNT(*) AS cnt FROM tb_order 
  //             WHERE order_status = 1 AND user_no = ?`,

  mypage_update: `UPDATE user 
    SET user_id = ?, user_email = ?, user_birth=?, user_phone =?, user_zipcode =?, user_adr1 =?, user_adr2 =?
    WHERE user_no = ?`,
  user_info: `SELECT user_id, user_email, user_name, user_birth, user_phone, user_zipcode, user_adr1, user_adr2, user_social_type
    FROM user
    WHERE user_no = ?`,
    deleteAccount: `DELETE FROM user WHERE user_no = ?`,

  //비밀번호
  get_password: 'SELECT user_pw FROM user WHERE user_no = ?',
  pass_update: 'UPDATE user SET user_pw = ? WHERE user_no = ?',

  //qna
  content: `SELECT * FROM qna JOIN user 
                WHERE qna.user_no=user.user_no AND qna_no = ?;`,
contentlist: `SELECT * FROM qna JOIN user 
                WHERE qna.user_no=user.user_no AND qna_no = ?;`,
qnalist: `SELECT * FROM qna JOIN user ON qna.user_no=user.user_no JOIN goods WHERE goods.goods_no = qna.goods_no `,
  write: `INSERT INTO qna (user_no, qna_title, qna_content, qna_pw, qna_img, goods_no) VALUES (?, ?, ?, ?, ?, ?)`,
  qna: `SELECT * FROM qna JOIN user ON qna.user_no = user.user_no
  JOIN goods ON qna.goods_no = goods.goods_no
                ORDER BY QNA_NO DESC LIMIT ? OFFSET ?;`,  
  qnaAdmin: `SELECT * FROM qna JOIN user
            ON qna.user_no=user.user_no JOIN goods ON qna.goods_no = goods.goods_no;`,
  qnaGoods: `SELECT * FROM qna JOIN user 
              WHERE qna.user_no=user.user_no and goods_no = ?`,
  qnaGoodscnt: `SELECT COUNT(*) FROM qna where goods_no = ?;`,
  deleteContent: `DELETE FROM qna WHERE qna_no = ?`,
  qnaEdit: `UPDATE qna SET qna_content = ?, qna_title = ?, qna_pw = ? WHERE qna_no = ?;`,
  qnaCheck: `SELECT user_type FROM user WHERE user_no =?;`,
  qnaCommentWrite: `UPDATE qna SET qna_comment = ?  WHERE qna_no = ?;`,
  qnacnt: `SELECT COUNT(*) FROM qna;`,
  //문의내역확인
  myqna: `SELECT * FROM qna JOIN user 
  WHERE qna.user_no=user.user_no AND qna.user_no = ? ORDER BY qna.QNA_NO DESC LIMIT ? OFFSET ?;`,
  myqnalist: `SELECT * FROM qna JOIN user WHERE qna.user_no=user.user_no AND qna.user_no = ?`,


 //리뷰 
 review_write: `INSERT INTO review (
  review_con, 
  review_img, 
  review_score, 
  user_no, 
  goods_no, 
  orders_no, 
  orders_status) VALUES (?, ?, ?, ?, ?, ?, ?);`,
get_review_no: `SELECT review_no FROM review WHERE orders_no = ?`,
review_img_insert: `UPDATE review
                      SET review_img = ?
                      WHERE review_no = ? `,
get_my_review: `SELECT * FROM review r JOIN orders o ON  r.orders_no = o.orders_no JOIN orders_detail od ON od.orders_no = o.orders_no JOIN goods g ON od.goods_no = g.goods_no WHERE o.orders_no = ?;`,
get_my_review_to: `SELECT * FROM review r JOIN orders o ON  r.orders_no = o.orders_no JOIN orders_detail od ON od.orders_no = o.orders_no JOIN goods g ON od.goods_no = g.goods_no WHERE r.review_no = ?;`,

//   // 리뷰 
//   review_write: `INSERT INTO review (review_con, user_no, goods_no, orders_no, orders_status, review_score) VALUES (?, ?, ?, ?, ?, ?)`,
//   get_review_no: `SELECT review_no FROM review WHERE orders_no = ?`,
//   review_img_insert: `UPDATE review
//                         SET review_img = ?
//                         WHERE review_no = ? `,
  get_my_review2: `SELECT * 
                    FROM review 
                    JOIN goods ON review.goods_no = goods.goods_no
                    WHERE user_no = ? `,
reviewEdit: `UPDATE review SET review_con = ?, review_score = ? WHERE review_no = ?;`,
// reviewImgEdit: `UPDATE review SET review_img = ? WHERE review_no = ?;`,
// get_my_review_detail: `SELECT * 
//                     FROM review 
//                     JOIN goods ON review.goods_no = goods.goods_no
//                     JOIN orders_detail ON review.orders_no = orders_detail.orders_no
//                     WHERE review.user_no = ? AND review_no = ? `,
   review_delete: `DELETE FROM review WHERE review_no = ?`,

}