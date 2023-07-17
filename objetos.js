function saveData(data) {
    localStorage.setItem("orderData", JSON.stringify(data));
  }

  function loadData() {
    var dataString = localStorage.getItem("orderData");
    return dataString ? JSON.parse(dataString) : [];
  }

  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    var order = document.getElementById("order").value;
    var product = document.getElementById("product").value;
    var quantity = parseInt(document.getElementById("quantity").value);
    var value = parseFloat(document.getElementById("value").value);

    var orderObject = { order: order, product: product, quantity: quantity, value: value };
    var orderArray = loadData();
    orderArray.push(orderObject);
    saveData(orderArray);

    document.getElementById("result").innerHTML = "<div class='alert alert-success'>Pedido agregado correctamente.</div>";
    document.getElementById("myForm").reset();

    showOrderList();
  });

  function showOrderList() {
    var orderArray = loadData();
    var orderList = document.getElementById("orderList");
    orderList.innerHTML = "";
    orderArray.forEach(function(order, index) {
      var listItem = document.createElement("li");
      listItem.innerHTML = "Pedido: " + order.order + "| Producto: " + order.product + " | Cantidad: " + order.quantity + " | $ " + order.value.toFixed(2)  + " <button class='btn btn-danger btn-sm' onclick='deleteOrder(" + index + ")'> X </button>";
      orderList.appendChild(listItem);
    });
  }

  function deleteOrder(index) {
    var orderArray = loadData();
    orderArray.splice(index, 1);
    saveData(orderArray);
    showOrderList();
  }

  showOrderList();