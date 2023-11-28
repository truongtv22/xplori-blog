import ReactCountryFlag from "react-country-flag";

export const RenderCountryImage = (country) => {
  switch (country) {
    case "All APAC":
      return (
        <img
          className="w-[60px] h-[40px]"
          src="https://services.xplori.world/media/images/products/2022/10/All_APAC_lTx3VnR.png"
          alt=""
        />
      );
    case "Crew":
      return (
        <img
          className="w-[60px] !h-[40px]"
          alt=""
          src="https://services.xplori.world/media/images/products/2021/12/Crew_Sim_RfI1btN.png"
        />
      );
    case "South Korea":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"KR"}
          svg
        />
      );
    case "Macau":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"MO"}
          svg
        />
      );
    case "China":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"CN"}
          svg
        />
      );
    case "Australia":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"AU"}
          svg
        />
      );
    case "Canada":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"CA"}
          svg
        />
      );
    case "Europe":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"EU"}
          svg
        />
      );
    case "Hong Kong":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"HK"}
          svg
        />
      );
    case "Indonesia":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"ID"}
          svg
        />
      );
    case "Singapore":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"SG"}
          svg
        />
      );
    case "Japan":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"JP"}
          svg
        />
      );
    case "Malaysia":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"MY"}
          svg
        />
      );
    case "Philippines":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"PH"}
          svg
        />
      );
    case "Thailand":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"TH"}
          svg
        />
      );
    case "Turkey":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"TR"}
          svg
        />
      );
    case "Taiwan":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"TW"}
          svg
        />
      );
    case "US":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"US"}
          svg
        />
      );
    case "Vietnam":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"VN"}
          svg
        />
      );
    case "South Africa":
      return (
        <ReactCountryFlag
          className="w-[60px] h-[40px]"
          countryCode={"ZA"}
          svg
        />
      );
    default:
      return (
        <img
          className="w-[60px] h-[40px]"
          alt=""
          src={`https://countryflagsapi.com/png/${country}`}
        />
      );
  }
};
