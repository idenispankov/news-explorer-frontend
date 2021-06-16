import './About.css';
import author from '../../images/author.jpeg';

const About = () => {
  return (
    <section className='about'>
      <img className='about__image' src={author} alt='author' />
      <div className='about__group'>
        <h2 className='about__title'>About the author</h2>
        <p className='about__text'>
          Full Stack Web Developer (MERN), skilled in building fully responsive,
          dynamic web apps. Excited about working with others to grow and
          achieve common goals.
        </p>
        <p className='about__text'>
          HTML5, CSS3, BEM, Responsive design, JavaScript, React.js, Node.js,
          Express.js, MongoDB, Postman, Git, GitHub, Figma, Jira, Kanban, Agile
        </p>
      </div>
    </section>
  );
};

export default About;
