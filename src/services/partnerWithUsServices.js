import requests from "./httpServices";

const PartnerWithUs = {
  register: async (data) => {
    return await requests.post("/vendor/register", data);
  }
};

export default PartnerWithUs;
