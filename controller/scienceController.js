import Science from '../models/scienceModel.js';

class scienceController {
  async get(req, res) {
    try {
      const sciences = await Science.find();

      return res.status(200).json({
        message: 'status',
        data: sciences,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Malu`mot topilmadi',
      });
    }
  }
  async create(req, res) {
    try {
      const scienceName = req.body.name;
      if (!scienceName) {
        return res.status(403).json({
          message: 'Fan nomini yuboring',
        });
      }

      const science = new Science({ name: req.body.name });
      await science.save();

      return res.status(200).json({
        message: 'success',
        data: science,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Yangi fan qo`shishda xatolik yuz berdi',
      });
    }
  }

  async update(req, res) {
    try {
      const scienceId = req.params.id;

      if (!scienceId) {
        return res.status(403).json({
          message: 'Fan idsini yuboring',
        });
      }

      const science = await Science.findById(scienceId);

      if (!science) {
        return res.status(404).json({
          message: 'Yuborilgan id bo`yicha fan topilmadi',
        });
      }

      const newScience = await Science.findOneAndUpdate(
        {
          _id: scienceId,
        },
        {
          name: req.body.name,
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'success',
        data: newScience,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Fanni tahrirlashda xatolik yuz berdi',
      });
    }
  }
  async delete(req, res) {
    const scienceId = req.params.id;

    if (!scienceId) {
      return res.status(403).json({
        message: 'Fan idsini yuboring',
      });
    }

    const science = await Science.findById(scienceId);

    if (!science) {
      return res.status(404).json({
        message: 'Bunday fan topilmadi',
      });
    }

    await Science.findOneAndDelete({ _id: scienceId });

    return res.status(200).json({
      message: 'success',
    });
  }
}

export default new scienceController();
