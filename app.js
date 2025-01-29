const menuItems = {
    breakfast: [
      { name: "Idli", price: 30 },
      { name: "Dosa", price: 25 },
      { name: "Poha", price: 40 },
      { name: "Upma", price: 30 },
      { name: "Vada", price: 20 },
      { name: "Puri", price: 40 },
    ],
    lunch: [
      { name: "Meals", price: 100 },
      { name: "Egg Biryani", price: 125 },
      { name: "Chicken Biryani", price: 150 },
      { name: "Egg Fried Rice", price: 110 },
      { name: "Chicken Fried Rice", price: 120 },
      { name: "Mushroom Biryani", price: 170 },
    ],
    snacks: [
      { name: "Bhel Puri", price: 30 },
      { name: "Samosa", price: 25 },
      { name: "Pani Puri", price: 40 },
    ],
    dinner: [
      { name: "Gobi Manchurian", price: 60 },
      { name: "Mattar Paneer", price: 75 },
      { name: "Roti+Curry", price: 85 },
      { name: "Butter Naan+Curry", price: 95 },
    ],
    beverages: [
      { name: "Lemonade", price: 15 },
      { name: "Apple Juice", price: 40 },
      { name: "Grape Juice", price: 50 },
      { name: "Sprite", price: 20 },
      { name: "Chocolate Milkshake", price: 70 },
    ],
    icecreams: [
      { name: "Vanilla", price: 20 },
      { name: "Strawberry", price: 40 },
      { name: "Butter Scotch", price: 30 },
      { name: "Mint Chocolate Chip", price: 45 },
    ],
  }
  function showMenu(menuId) {
    const menuContent = document.getElementById("menu-content")
    menuContent.innerHTML = ""
    const items = menuItems[menuId]
    items.forEach((item) => {
      const itemElement = document.createElement("div")
      itemElement.className = "menu-item"
      itemElement.innerHTML = `
              <span class="item-name">${item.name}</span>
              <span class="item-price">₹${item.price.toFixed(2)}</span>
              <div class="item-quantity">
                  <input type="number" id="quantity-${item.name.replace(/ /g, "")}" placeholder="Qty" min="0">
              </div> `
      menuContent.appendChild(itemElement)
    })
    document.getElementById("calculate-button").style.display = "block"
  }
  function calculateFinalCost() {
    let totalCost = 0;
    let receiptContent = "";
    Object.values(menuItems)
      .flat()
      .forEach((item) => {
        const quantityInput = document.getElementById(`quantity-${item.name.replace(/ /g, "")}`);
        if (quantityInput) {
          const quantity = Number.parseInt(quantityInput.value) || 0;
          if (quantity > 0) {
            const cost = item.price * quantity;
            totalCost += cost;
            receiptContent += `
              <div class="receipt-item">
                <span>${item.name}</span>
                <span>₹${cost.toFixed(2)}</span>
              </div>
            `;
          }
        }
      });
    const tax = 0.15 * totalCost;
    const finalTotalCost = totalCost + tax;
      receiptContent += `
      <div class="receipt-item receipt-total">
        <span>Subtotal:</span><span>₹${totalCost.toFixed(2)}</span>
      </div>
      <div class="receipt-item">
        <span>Tax (15%):</span><span>₹${tax.toFixed(2)}</span>
      </div>
      <div class="receipt-item receipt-total">
        <span>Total:</span><span>₹${finalTotalCost.toFixed(2)}</span>
      </div>
    `;
      document.getElementById("receipt-content").innerHTML = receiptContent;
    document.getElementById("receipt-container").style.display = "block";
  }
  