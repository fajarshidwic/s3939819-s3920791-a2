import React from "react";
import almondImage from "../images/almond (2).jpg";
import coffImage from "../images/coffebean.jpg";
import gbeansImage from "../images/greenbea.jpg";
import avoImage from "../images/potato.jpg";
import scornImage from "../images/sweetcorn (2).jpg";
import tomatoImage from "../images/tomato.jpg";
import "./Home.css";

function Home(props) {
  return (

    <div className="main">

      <section class="home">
        <div class="home-text">
          <h1>Savor Savings & <br/> Organic Goodness</h1>
          <p>Don't miss out! <br/> Your Favourites on Sales Today!</p>
          <a href="./Shop" class="btn">Shop Now</a>
        </div>
      </section>

      <div class="title1">
        <h1>Featured Products</h1>
      </div>
      
      <div class="flex-row">

          <div class="card">
            <img src={almondImage} alt="Almonds"/>
            <h1>Almonds</h1>
            <p class="price">$6.99</p>
            <p>Some text about the jeans..</p>
            <p><button>Add to Cart</button></p>
          </div>

          <div class="card">
            <img src={tomatoImage} alt="tomato"/>
            <h1>Tomatoes</h1>
            <p class="price">$9.99</p>
            <p>Some text about the jeans..</p>
            <p><button>Add to Cart</button></p>
          </div>

          <div class="card">
        <img src={avoImage} alt="Avocados"/>
        <h1>Potatoes</h1>
        <p class="price">$8.99</p>
        <p>Some text about the jeans..</p>
        <p><button>Add to Cart</button></p>
      </div>

      </div>

      <div class="flex-row2">

      <div class="card">
        <img src={coffImage} alt="Coffee Beans"/>
        <h1>Coffee Beans</h1>
        <p class="price">$10.99</p>
        <p>Some text about the jeans..</p>
        <p><button>Add to Cart</button></p>
      </div>

      <div class="card">
        <img src={gbeansImage} alt="Green Beans"/>
        <h1>Green Beans</h1>
        <p class="price">$7.99</p>
        <p>Some text about the jeans..</p>
        <p><button>Add to Cart</button></p>
      </div>

      <div class="card">
        <img src={scornImage} alt="Sweet Corn"/>
        <h1>Sweet Corns</h1>
        <p class="price">$8.99</p>
        <p>Some text about the jeans..</p>
        <p><button>Add to Cart</button></p>
      </div>
      </div>

      <div class="title2">
        <h1>Understanding Organic Food</h1>
      </div>

      <div class="organic-flex">

        <div>
          <h3>Health benefits</h3>
          <p>Organic food is grown without synthetic pesticides, fertilizers, or genetically modified organisms (GMOs).
            It's often perceived as healthier because it contains fewer harmful chemicals and pesticides, 
            promoting better overall health and well-being.</p>
        </div>

        <div>
          <h3>Environmental Sustainability</h3>
          <p>Choosing organic supports sustainable farming practices that prioritize soil and water conservation, biodiversity, 
            and reduced pollution. Organic farming methods focus on preserving natural ecosystems, protecting wildlife habitats,
            and promoting long-term environmental health.</p>
        </div>
      </div>

      <div class="organic-flex-down">
        <div>
          <h3>Better for Farmers and Communities</h3>
          <p>Organic farming typically involves smaller-scale, local farms that prioritize fair labor practices and community engagement.
            By supporting organic agriculture, consumers contribute to the livelihoods of farmers and workers, fostering stronger
            local economies and communities.</p>
         </div> 
      </div>

      <div class="title3">
        <h1>Nutritional Insights</h1>
      </div>

      <div class="nutri-flex">


        <div class="nutri-column">
         <div>
         <h3>Prioritize Potassium</h3>
          <p>Focus on increasing your potassium intake rather than excessively reducing sodium, especially if you don't have hypertension or heart disease.
            Opt for potassium-rich foods such as baked potatoes, coconut water, white beans, bananas, dates, clams, and low-fat or nonfat yogurt. 
            Many people consume too much sodium from processed foods and not enough potassium, which is crucial for maintaining healthy blood vessels.
            While cutting sodium has minimal impact on healthy individuals, achieving a balance between sodium and potassium is essential for overall vascular health.</p>
        </div>
          
        <div>
          <h3>Eat More Plants</h3>
          <p>Switching to a plant-based diet offers numerous health benefits, from reducing the risk of chronic diseases to boosting immune function.
             Drs. Landsman and Singh suggest starting with small changes, like incorporating plant-based meals and swapping sugary drinks for water, 
             to gradually improve health outcomes.</p>
         </div>  

         <div> 
          <h3>Boost Your Immune System</h3>
          <p>Maintaining a strong immune system is crucial, especially during times of heightened stress like a global pandemic. 
            Registered dietitian Toby Amidor emphasizes the importance of a healthy diet in supporting immunity. By focusing on nutritious eating habits, 
            you can enhance your body's ability to fight off illness and stay resilient.</p>
         </div> 

         </div>

      </div>

      



      
      </div>
      
  );
}

export default Home;
