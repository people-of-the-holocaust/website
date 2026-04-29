// The margins are essentially just hardcoded until I was happy with what it looked like, should probably
// be changed in styles.css at some point
import Navbar from "../components/Navbar";
import MapView from "../components/MapView";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1>PEOPLE OF THE HOLOCAUST</h1>
        </div>
      </section>

      <section className="database-section">
        <h3 className="section-title"> Why This Project?</h3>
          <p className="desc-text">
          The People of the Holocaust Database project derives individual stories from the pages of The United States 
          Holocaust Memorial Museum Encyclopedia of Camps and Ghettos, 1933-1945 into 
          an accessible website of information about the human impact of the Holocaust. 
          </p>

          <p className="desc-text" style={{marginTop: "1rem"}}>
          This software is intended for academics who are using it in conjunction with other sources to supplement their 
          understanding of individuals involved in the Holocaust. The tool compliments the ECG, 
          as it reframes the information contained in the huge volumes to focus on the individual. Although aimed 
          at researchers and students, our tool will be available to the 
          public with no registration or login required. 
          </p>  
      </section>

      <section className="database-section map-section" style={{ marginTop: "-5rem" }}>
        <h3 className="section-title"> Map View</h3>
        <MapView />
      </section>
    </>
  );
}