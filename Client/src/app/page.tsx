import Image from "next/image";

export default function Home() {
  return (
    <div>
        <div className="row m-4">
          <div className="col-3">
            <div className="card" style={{width: '100%'}}>
              <div className="card-header">
                Danh sách người chơi online
              </div>
              <ul id="onlinePlayerList" className="list-group list-group-flush">
              </ul>
            </div>
          </div>
          <div className="col-9">
            <div className="container border border-secondary rounded" style={{minHeight: '22em'}}>
            </div>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Chat
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <ul id="chatbox" className="list-group">
                </ul>
              </div>
              <div className="row">
                <div className="col-10">
                  <label htmlFor="chat_input" className="visually-hidden ">Password</label>
                  <input type="text" className="form-control" id="chat_input" placeholder="nhập nội dung" />
                </div>
                <div className="col-2">
                  <button type="button" className="btn btn-primary">Gửi</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
