import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Cart } from './Cart';
import type { CartItem } from '../Types/ProdData';
import { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';
import { SortMenu } from './SortMenu';
import { Categories } from './Categories';
import { getCategoryList } from '../apis/api';

interface HeaderProps {
  totalItems: number
  cart:CartItem[]
  setCart: (item : CartItem[]) => void
  search: string
  setSearch: (value: string) => void
  sortType: string
  setSortType:(value:string) => void
  category : string
  setCategory :(value : string) => void
}

export const Header = ({totalItems , cart, setCart,search,setSearch,setSortType,sortType, category, setCategory}:HeaderProps) => {
    const [openCart, setOpenCart] = useState(false);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    
    useEffect(() => {
        fetchCategoriesList();
    },[])

    const fetchCategoriesList = async() => {
        const data = await getCategoryList();
        setCategoriesList(data);
    }
    return(
      <div className="header">
      <div className="shop-title">Mini Shop</div>

      <SearchBar search={search} setSearch={setSearch}/>
      <div className="header-actions">
        <Categories category={category} setCategory={setCategory} categoriesList={categoriesList}/>
        <SortMenu sortType={sortType} setSortType={setSortType}/>

      <button
        className="cart-button"
        title="My Cart"
        onClick={() => setOpenCart(!openCart)}
      >
        <ShoppingCartIcon />
        <div style={{fontSize:"20px",marginLeft:"3px"}}>{totalItems}</div>
      </button>
      </div>
      {openCart && (
        <div className="cart-dropdown">
        <Cart cart={cart} setCart={setCart} />
        </div>
        )}
    </div>
    )
}