//  animation Serach
var searchBox = document.querySelector(".search-box");
var searchBtn = document.querySelector(".search-btn");
var cancelBtn = document.querySelector(".cancel-btn");
var input = document.getElementById("q");

searchBox.style.transition =
    "0.5s cubic-bezier(0.7,-0.5,0.3,1.5)";

searchBtn.onclick = function () {
    searchBox.classList.add("active");
}

cancelBtn.onclick = function () {
    searchBox.classList.remove("active");
}

//----------------------------------------------------------------
//Read data
var mydata;
function loadData() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4 && xhttp.status == 200) {

            var jsonText = xhttp.responseText;

            var jsObject = JSON.parse(jsonText);

            valueCallBack(jsObject);
        }
    };

    xhttp.open("GET", "json/foods.json");

    xhttp.send();
}

//----------------------------------------------------------------
function valueCallBack(jsObject) {
    mydata = jsObject;
}

//----------------------------------------------------------------
function searchFood() {

    if (mydata == undefined) {
        return;
    }

    var searchText =
        document.getElementById("q").value.trim();

    var result = [];

    var resultBox =
        document.getElementById("search-result-box");

    resultBox.innerHTML = "";


    //----------------------------------------------------------------
    for (let i = 0; i < mydata.product_groups.length; i++) {

        var products =
            mydata.product_groups[i].group_products;

        for (let j = 0; j < products.length; j++) {

            var product =
                products[j];

            if (
                product.product_name.indexOf(searchText) != -1
            ) {

                result.push(product);
            }
        }
    }


    //----------------------------------------------------------------
    var h1 =
        document.createElement("h1");

    h1.classList.add("search-box-title");

    h1.appendChild(
        document.createTextNode(
            "نتیجه جستجوی شما :"
        )
    );

    resultBox.appendChild(h1);


    //----------------------------------------------------------------
    if (result.length == 0) {

        var h3 =
            document.createElement("h3");

        h3.appendChild(
            document.createTextNode(
                "غذایی یافت نشد"
            )
        );

        resultBox.appendChild(h3);

        return;
    }


    //----------------------------------------------------------------
    for (let i = 0; i < result.length; i++) {

        var product =
            result[i];

        var typeIndex = 0;


        for (let j = 0; j < product.product_type.length; j++) {

            if (
                product.product_type[j] == "normal"
            ) {

                typeIndex = j;

                break;
            }
        }


        var row =
            createSearchRow(
                product.product_name,
                product.product_image[0],
                product.product_type[typeIndex],
                product.product_price[typeIndex]
            );


        resultBox.appendChild(row);
    }
}


//----------------------------------------------------------------
function createSearchRow(name, image, type, price) {

    var div =
        document.createElement("div");

    div.classList.add(
        "search-box-product"
    );


    var div2 =
        document.createElement("div");

    div2.classList.add(
        "search-box-img-title"
    );

    var img =
        document.createElement("img");

    img.classList.add(
        "search-box-img"
    );

    img.setAttribute(
        "src",
        image
    );


    var h3 =
        document.createElement("h3");

    h3.appendChild(
        document.createTextNode(
            name
        )
    );


    var strongType =
        document.createElement("strong");

    strongType.appendChild(
        document.createTextNode(
            type
        )
    );

    var strongPrice =
        document.createElement("strong");

    strongPrice.appendChild(
        document.createTextNode(
            price + " تومان"
        )
    );
    div2.appendChild(img);

    div2.appendChild(h3);

    div.appendChild(div2);

    div.appendChild(strongType);

    div.appendChild(strongPrice);

    return div;
}


//----------------------------------------------------------------
function keyPressSearch(event) {

    if (event.keyCode == 13) {

        searchFood();
    }
}
//----------------------------------------------------------------
document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadData();

        var input =
            document.getElementById("q");

        input.onkeypress = function (event) {

            keyPressSearch(event);
        }
    }
);
//----------------------------------------------------------------