import addIcon from '../../public/assets/images/icon-add-to-cart.svg'
import plusIcon from '../../public/assets/images/icon-increment-quantity.svg'
import minusIcon from '../../public/assets/images/icon-decrement-quantity.svg'



import { useState, useEffect } from 'react'



function Item({ele, dispatch, cart}) {
  const [active, setActive] = useState(false)
  const [mobile, setMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 720) {
      setMobile(true)
    } else {
      setMobile(false)
    }
  }, [])

  function clickHandle() {
    setActive(true)
    dispatch({type: "ADD", payload: ele})
  }

  function handleMinus() {
    const itemToRemove = cart.find(i => i.name === ele.name)
    if(itemToRemove.qty === 1) {
      dispatch({type: "DELETE", payload: ele})
      setActive(false)
    }
    dispatch({type: "MINUS", payload: ele})
  }

  useEffect(() => {
    const itemToRemove = cart.find(i => i.name === ele.name)
    if(!itemToRemove) {
      setActive(false)
    }
  }, [cart])
 
  const [btnQty] = cart.filter(item => item.name === ele.name)
 
  return (
    <div className="item">
      <div className="item__img">

        <img src={`${mobile ? ele.image.mobile : ele.image.desktop }`} alt="" />
        <div className="item__img--add">
          {!active && <button className='btn btn-cart' onClick={clickHandle}>
            <img src={addIcon} alt="" />
            Add to cart
          </button>}
          {active && <button className='btn btn-add'> 
            <div className="btn-add_minus" onClick={handleMinus}>
              <img src={minusIcon} alt="" />
            </div>
            <div className="btn-add_qty">{btnQty?.qty}</div>
            <div className="btn-add_plus" onClick={() => dispatch({type: "PLUS", payload: ele})}>
              <img src={plusIcon} alt="" />
            </div>
          </button>}
        </div>
      </div>
      <div className="item__desc">
        <p className="item__desc--cat">{ele.category}</p>
        <p className="item__desc--name">{ele.name}</p>
        <p className="item__desc--price">${ele.price.toFixed(2)}</p>
      </div>
    </div>
  )
}


export default Item