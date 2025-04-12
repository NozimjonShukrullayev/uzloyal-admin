import { useEffect, useState } from "react";
import Input from "./Input";
import { FaSearch } from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, addNews, editNews, removeNews } from "./NewsSlice";
import "./News.css";
// import { toast } from "react-toastify";


function News() {
  const [titleEn, setTitleEn] = useState("");
  const [titleRu, setTitleRu] = useState("");
  const [titleUz, setTitleUz] = useState("");
  const [titleTr, setTitleTr] = useState("");
  const [titleZh, setTitleZh] = useState("");
  const [editTitleEn, setEditTitleEn] = useState("");
  const [editTitleRu, setEditTitleRu] = useState("");
  const [editTitleUz, setEditTitleUz] = useState("");
  const [editTitleTr, setEditTitleTr] = useState("");
  const [editTitleZh, setEditTitleZh] = useState("");
  const [textEn, setTextEn] = useState("");
  const [textRu, setTextRu] = useState("");
  const [textUz, setTextUz] = useState("");
  const [textTr, setTextTr] = useState("");
  const [textZh, setTextZh] = useState("");
  const [editTextEn, setEditTextEn] = useState("");
  const [editTextRu, setEditTextRu] = useState("");
  const [editTextUz, setEditTextUz] = useState("");
  const [editTextTr, setEditTextTr] = useState("");
  const [editTextZh, setEditTextZh] = useState("");
  const [authorNews, setAuthorNews] = useState("");
  const [editAuthorNews, setEditAuthorNews] = useState("");
  const [imagesNews, setImagesNews] = useState([]);
  const [editImagesNews, setEditImagesNews] = useState([]);
  // const [prevImage, setPrevImage] = useState([]);
  const [search, setSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const imgUrl = "https://api.dezinfeksiyatashkent.uz/api/uploads/images/";

  const dispatch = useDispatch();
  const { newsData, loading } = useSelector(state => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // bu qismi editni bosganda tanlangan category malumotlarini chiqarish uchun
  useEffect(() => {
    if (editId !== null) {
      const news = newsData.find((news) => news.id === editId);
      if (news) {
        setEditTitleEn(news?.title_en);
        setEditTitleRu(news?.title_ru);
        setEditTitleUz(news?.title_uz);
        setEditTitleTr(news?.title_tr);
        setEditTitleZh(news?.title_zh);
        setEditTextEn(news?.text_en);
        setEditTextRu(news?.text_ru);
        setEditTextUz(news?.text_uz);
        setEditTextTr(news?.text_tr);
        setEditTextZh(news?.text_zh);
        setEditAuthorNews(news?.author);
        // setEditImagesNews(news?.images);
      }
    }
  }, [editId, newsData]);

  if (loading) {
    return (
      <div className="loader-container flex justify-center items-center h-[50vh]">
        <Oval
          height={80}
          width={80}
          color="#3498DB "
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#07F8AF"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  //news qo'shish uchun
  const handleAddNews = (e) => {
    e.preventDefault();

    const newNews = {
      title_en: titleEn,
      title_ru: titleRu,
      title_uz: titleUz,
      title_tr: titleTr,
      title_zh: titleZh,
      text_en: textEn,
      text_ru: textRu,
      text_uz: textUz,
      text_tr: textTr,
      text_zh: textZh,
      author: authorNews,
      images: imagesNews,
    };

    console.log(newNews);
    // setPrevImage([...imagesNews]);
    dispatch(addNews(newNews));
    setTitleEn("");
    setTitleRu("");
    setTitleUz("");
    setTitleTr("");
    setTitleZh("");
    setTextEn("");
    setTextRu("");
    setTextUz("");
    setTextTr("");
    setTextZh("");
    setAuthorNews("");
    setImagesNews([]);
    setIsOpenModal(false);
  };

  // edit news
  const handleEditNews = (e) => {
    e.preventDefault();

    const updateNews = {
      id: editId,
      title_en: editTitleEn,
      title_ru: editTitleRu,
      title_uz: editTitleUz,
      title_tr: editTitleTr,
      title_zh: editTitleZh,
      text_en: editTextEn,
      text_ru: editTextRu,
      text_uz: editTextUz,
      text_tr: editTextTr,
      text_zh: editTextZh,
      author: editAuthorNews,
      // imagesNews,
      // images: editImagesNews,
    };
    dispatch(editNews(updateNews));
    setEditTitleEn("");
    setEditTitleRu("");
    setEditTitleUz("");
    setEditTitleTr("");
    setEditTitleZh("");
    setEditTextEn("");
    setEditTextRu("");
    setEditTextUz("");
    setEditTextTr("");
    setEditTextZh("");
    setEditAuthorNews("");
    // setImagesNews([]);
    setEditImagesNews([]);
    setIsOpenModal(false);
    setIsEdit(false);
    setEditId(null);
  };

  // open modal
  const openEditModal = (id) => {
    if (id) {
      setEditId(id);
      setIsOpenModal(true);
      setIsEdit(true);
    } else {
      setIsEdit(false);
      setIsOpenModal(true);
    }
  };

  // delete news uchun
  const deleteNews = (id) => {
    dispatch(removeNews(id));
  };

  // search news uchun
  const filteredNews = newsData.filter((news) =>
    news?.title_en.toLowerCase().includes(search.toLowerCase()) ||
    news?.title_ru.toLowerCase().includes(search.toLowerCase()) ||
    news?.title_uz.toLowerCase().includes(search.toLowerCase()) ||
    news?.title_tr.toLowerCase().includes(search.toLowerCase()) ||
    news?.title_zh.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="news" className="categories-container">
      <div className="category-search-add">
        <div className="category-search">
          <input
            type="text"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search News"
          />
          <FaSearch className="search-icon" />
        </div>
        <div key={5} className="add-btns">
          <button className="add-btn" onClick={() => setIsOpenModal(true)}>
            Add+
          </button>
        </div>
      </div>
      <div className="category-table">
        <table className="categories">
          <thead className="category-thead">
            <tr>
              <th>№</th>
              <th>Title en</th>
              <th>Title ru</th>
              <th>Title uz</th>
              <th>Title tr</th>
              <th>Title zh</th>
              <th>Author</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNews.length === 0 ? (
              <>
                <tr>
                  <td colSpan={7}>
                    <h2 className="uppercase text-red-600">No data found</h2>
                  </td>
                </tr>
              </>
            ) : (
              filteredNews.map((news, index) => (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{news?.title_en}</td>
                    <td>{news?.title_ru}</td>
                    <td>{news?.title_uz}</td>
                    <td>{news?.title_tr}</td>
                    <td>{news?.title_zh}</td>
                    <td>{news?.author}</td>
                    <td>
                      {/* {news?.news_images[0]?.['image.src'] && (<img src={imgUrl + news?.news_images[0]?.['image.src']} alt="news-img" />)} */}
                    </td>
                    <td className="actions-td">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(news.id)}
                      >
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteNews(news.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isOpenModal && (
        <div className="modal">
          <div className="modal-content">
            <form action="" onSubmit={isEdit ? handleEditNews : handleAddNews}>
              <span
                className="close-btn"
                onClick={(id) => {
                  if (id) {
                    setIsEdit(false);
                    setIsOpenModal(false);
                  } else {
                    setIsOpenModal(false);
                  }
                }}
              >
                X
              </span>
              <h2>{isEdit ? "Edit News" : "Add News"}</h2>
              <div className="button-group">
                <div className="titles">
                  <Input key={1} placeholder="Title en" isEdit={isEdit} editTitle={editTitleEn} title={titleEn} setEditTitle={setEditTitleEn} setTitle={setTitleEn} />
                  <Input key={2} placeholder="Title ru" isEdit={isEdit} editTitle={editTitleRu} title={titleRu} setEditTitle={setEditTitleRu} setTitle={setTitleRu} />
                  <Input key={3} placeholder="Title uz" isEdit={isEdit} editTitle={editTitleUz} title={titleUz} setEditTitle={setEditTitleUz} setTitle={setTitleUz} />
                  <Input key={4} placeholder="Title tr" isEdit={isEdit} editTitle={editTitleTr} title={titleTr} setEditTitle={setEditTitleTr} setTitle={setTitleTr} />
                  <Input key={5} placeholder="Title zh" isEdit={isEdit} editTitle={editTitleZh} title={titleZh} setEditTitle={setEditTitleZh} setTitle={setTitleZh} />
                </div>
                <div className="texts">
                  <Input key={6} placeholder="Text en" isEdit={isEdit} editTitle={editTextEn} title={textEn} setEditTitle={setEditTextEn} setTitle={setTextEn} />
                  <Input key={7} placeholder="Text ru" isEdit={isEdit} editTitle={editTextRu} title={textRu} setEditTitle={setEditTextRu} setTitle={setTextRu} />
                  <Input key={8} placeholder="Text uz" isEdit={isEdit} editTitle={editTextUz} title={textUz} setEditTitle={setEditTextUz} setTitle={setTextUz} />
                  <Input key={9} placeholder="Text tr" isEdit={isEdit} editTitle={editTextTr} title={textTr} setEditTitle={setEditTextTr} setTitle={setTextTr} />
                  <Input key={10} placeholder="Text zh" isEdit={isEdit} editTitle={editTextZh} title={textZh} setEditTitle={setEditTextZh} setTitle={setTextZh} />
                </div>
              </div>
              <Input key={11} placeholder="Author" isEdit={isEdit} editTitle={editAuthorNews} title={authorNews} setEditTitle={setEditAuthorNews} setTitle={setAuthorNews} />
              <input placeholder="Multiple images can be uploaded" type="file" onChange={isEdit ? (e) => setEditImagesNews([...e.target.files]) : (e) => setImagesNews([...e.target.files])} name="img" id="img" />
              <button type="submit">
                {isEdit ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default News;