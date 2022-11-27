import React from "react";

const Comments = (props) => {
  const cmtdel = (e) => {
    // e.preventDefault();
    // axios
    //   .post("/ittime/cmtdel", {
    //     cmt_seq: props.item.cmt_seq,
    //   })
    //   .then(function (res) {
    //     alert("댓글 삭제 완료");
    //     window.location.reload();
    //   })
    //   .catch(function (error) {});
  };
  return (
    <div className="comments">
      <div>
        <div className="item">
          <img src={`img/${props.item.mb_pic}`} className="img" />
          <div className="info">
            <div className="span">
              <span>{props.item.mb_nick}</span>
            </div>

            <div className="p">
              <p>{props.item.cmt_content}</p>
            </div>
          </div>
          <span className="date">{props.item.cmt_date}</span>
          <span
            onClick={cmtdel}
            className={
              props.item.mb_nick === sessionStorage.getItem("nick")
                ? "delete"
                : "delete hidden"
            }
          >
            삭제
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comments;
