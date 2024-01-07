import Grade from '../models/gradeModel.js';

class gradeController {
  async get(req, res) {
    try {
      const grades = await Grade.find();

      return res.status(200).json({
        message: 'success',
        data: grades,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server xatoligi',
        error: err,
      });
    }
  }
  async create(req, res) {
    try {
      const gradeName = req.body.name;
      const scienceId = req.body.science_id;

      if (!scienceId) {
        return res.status(403).json({
          message: 'Bunday fan topilmadi',
        });
      }

      if (!gradeName) {
        return res.status(403).json({
          message: 'Sinf nomini yuboring',
        });
      }

      const grade = new Grade({ name: gradeName, science_id: scienceId });
      console.log(grade);
      await grade.save();

      return res.status(200).json({
        message: 'success',
        data: grade,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Server xatoligi',
        error: err,
      });
    }
  }

  async update(req, res) {
    try {
      const gradeId = req.params.id;
      if (!gradeId) {
        return res.status(403).json({
          message: 'Sinf idsini yuboring',
        });
      }

      const grade = await Grade.findById(gradeId)

      if(!grade) {
        return res.status(404).json({
          message: 'Bunday sinf topilmadi'
        })
      }

      const gradeName = req.body.name;
      const scienceId = req.body.science_id;

      if(!(gradeName || scienceId)) {
        return res.status(403).json({
          message: 'Fan va sinfni yuboring',
        });
      }

      const newGrade = await Grade.findOneAndUpdate(
        {
          _id: gradeId,
        },
        {
          name: gradeName,
          science_id: scienceId,
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'success',
        data: newGrade
      })
 
      
    } catch (err) {
      return res.status(500).json({
        message: 'Server xatoligi',
        error: err,
      });
    }
  }
  async delete(req, res) {
    try {
      const gradeId = req.params.id;
      if (!gradeId) {
        return res.status(403).json({
          message: 'Sinf idsini yuboring',
        });
      }

      const grade = await Grade.findById(gradeId)

      if(!grade) {
        return res.status(404).json({
          message: 'Bunday sinf topilmadi'
        })
      }

      const deleted = await Grade.findByIdAndDelete({
        _id: gradeId
      })

      return res.status(200).json({
        message: 'success',
        data: deleted
      })

    } catch (err) {
      return res.status(500).json({
        message: 'Server xatoligi',
        error: err,
      });
    }
  }
}

export default new gradeController();
