const db = require("../../data/db-config");
const schemes = require("./scheme-model");

/*
  Eğer `scheme_id` veritabanında yoksa:

  durum 404
  {
    "message": "scheme_id <gerçek id> id li şema bulunamadı"
  }
*/
const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params;
  schemes
    .findById(scheme_id)
    .then((scheme) => {
      if (scheme) {
        req.scheme = scheme;
        next();
      } else {
        res.status(404).json({
          message: `scheme_id ${scheme_id} id li şema bulunamadı`,
        });
      }
    })
    .catch(next);
};

/*
  Eğer `scheme_name` yoksa, boş string ya da string değil:

  durum 400
  {
    "message": "Geçersiz scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined ||
    typeof scheme_name !== "string" ||
    !scheme_name.trim()
  ) {
    res.status(400).json({
      message: "Geçersiz scheme_name",
    });
  } else {
    next();
  }
};

/*
  Eğer `instructions` yoksa, boş string yada string değilse, ya da
  eğer `step_number` sayı değilse ya da birden küçükse:

  durum 400
  {
    "message": "Hatalı step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body;
  if (
    instructions === undefined ||
    typeof instructions !== "string" ||
    !instructions.trim() ||
    typeof step_number !== "number" ||
    step_number < 1
  ) {
    res.status(400).json({
      message: "Hatalı step",
    });
  } else {
    next();
  }
};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
