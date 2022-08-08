import './App.css';
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import AddArticle from "./components/AddArticle";
import EditArticle from "./components/EditArticle";
import CategoryListPage from "./components/CategoryListPage";
import AddCategory from "./components/AddCategory";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from './components/IsPrivate';
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/articles" element={ <ArticleListPage />} />
        <Route path="/articles/:articleId" elemant={ <ArticleDetailsPage />} />
        <Route path="/articles/:articleId/add" element={ <IsPrivate>
          <AddArticle />
        </IsPrivate>} />
        <Route path="/articles/:articleId/edit" element={ <IsPrivate>
          <EditArticle />
        </IsPrivate>} />
        <Route path="/categories" element={ <CategoryListPage />} />
        <Route path="/categories/add" element={ <IsPrivate>
          <AddCategory />
        </IsPrivate>} /> 
        <Route path="/signup" element={ <IsAnon>
            <SignupPage />
          </IsAnon> } />
        <Route path="/login" element={ <IsAnon>
            <LoginPage />
          </IsAnon> } /> 
      </Routes>

    </div>
  );
}

export default App;
