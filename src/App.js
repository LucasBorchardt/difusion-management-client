import './App.css';
import { Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import HomePage from "./pages/HomePage";
import ArticleListPage from "./pages/ArticleListPage";
import ArticleDetailsPage from "./pages/ArticleDetailsPage";
import AddArticle from "./components/AddArticle";
import EditArticlePage from "./pages/EditArticlePage";
import CategoryListPage from "./pages/CategoryListPage";
import AddCategory from "./components/AddCategory";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from './components/IsPrivate';
import IsAnon from "./components/IsAnon";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">

      <Menu />

      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/articles" element={ <ArticleListPage />} />
        <Route path="/articles/:articleId" element={ <ArticleDetailsPage />} />
        <Route path="/articles/add" element={ <IsPrivate>
          <AddArticle />
        </IsPrivate>} />
        <Route path="/articles/:articleId/edit" element={ <IsPrivate>
          <EditArticlePage />
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
