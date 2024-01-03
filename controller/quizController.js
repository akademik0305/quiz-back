import Quiz from '../models/quizModel.js';
import Answer from '../models/answerModel.js';

function generateRandomNumbers(count, length) {
  let randomNumbers = [];
  while(randomNumbers.length < count) {
    let number = Math.floor(Math.random() * length - 1) + 1

    const isExist = randomNumbers.find(num => num === number)

    if(!isExist){
      randomNumbers.push(number)
    } else {
      continue
    }
  }

  return randomNumbers
}

class QuizController {
  async get(req, res) {
    res.status(200).json({
      message: 'succes',
    });
  }

  async create(req, res) {
    try {
      // const quiz = new Quiz({
      //   name: req.body.name,
      //   index: index,
      //   answers: req.body.answers,
      // });
      // await quiz.save();
      // index += 1;
      // return res.status(200).json({
      //   message: 'Test muvaffaqqiyatli yaratildi',
      // });
      const quiz = new Quiz({ title: req.body.title });
      await quiz.save();

      let a
      for (let item of req.body.answers) {
        const answer = new Answer({
          key: item.key,
          text: item.text,
          quiz_id: quiz._id,
          isCorrect: item.isCorrect,
        });

        answer.save();
      }

      return res.status(200).json({
        message: 'success',
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Test yaratishda xatolik' + err,
      });
    }

    // res.status(200).json({
    //   "data": req.body
    // })
  }
  async update(req, res) {
    res.status(200).json({
      message: 'succes',
    });
  }

  async random(req, res) {
    // const quizes = await Quiz.find(
    //   {},
    //   {
    //     'answers.a.isCorrect': 0,
    //     'answers.b.isCorrect': 0,
    //     'answers.c.isCorrect': 0,
    //     'answers.d.isCorrect': 0,
    //   }
    // );

    // const randomIndex = Math.floor(Math.random() * quizes.length);

    // res.status(200).json({
    //   message: 'succes',
    //   data: quizes[randomIndex],
    // });

    try {
      const randomNumbers = generateRandomNumbers(5, 20)
      
      return res.status(200).json({
        message: 'success',
        data: randomNumbers,
      });

      
    } catch (err) {
      return res.status(500).json({
        message: 'Testlarni olishda xatolik yuz berdi',
      });
    }
  }

  async check(req, res) {
    try {
      const quiz = await Quiz.findById(req.body.id);
      if (!quiz) {
        return res.status(404).json({
          message: 'Test topilmadi, Idni tekshiring',
        });
      }

      const isCorrect = quiz.answers[req.body.answer].isCorrect;

      if (!isCorrect) {
        return res.status(200).json({
          message: 'Javob xato',
          isCorrect,
        });
      }

      return res.status(200).json({
        message: 'Javob to`g`ri. Tabriklayman',
        isCorrect,
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Testni tekshirishda xatolik yuz berdi',
      });
    }
  }
  async delete(req, res) {
    res.status(200).json({
      message: 'succes',
    });
  }
}

export default new QuizController();
