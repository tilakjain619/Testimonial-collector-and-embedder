import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../GlobalState';
import { useNavigate, Link } from 'react-router-dom';
import AverageRatingChart from '../components/AverageRatingChart';
import RatingOverTimeChart from '../components/RatingOverTimeChart';
import DailySubmissionsChart from '../components/DailySubmissionsChart';
import { MagicCard } from "@/components/magicui/magic-card";
import Loader from '../components/Loader';

const Dashboard = () => {
  const state = useContext(GlobalState);
  const { userInfo, isLogged } = state.userAPI;
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [loading, setLoading] = useState(true); // Loader state
  const [token] = state.token;
  const { userTestimonialPages, fetchUserTestimonials } = state.testimonialAPI;

  const navigate = useNavigate();

  const checkUser = () => {
    const isUserTrue = localStorage.getItem('testimonial_user_login');
    if (isUserTrue === 'false' || !isUserTrue) {
      navigate('/login');
    }
  };

  useEffect(() => {
    checkUser();
    fetchUserTestimonials(token).finally(() => setLoading(false));
  }, []);

  // Calculating the total testimonials and average rating
  const totalTestimonials = userTestimonialPages.reduce((acc, page) => acc + page.testimonials.length, 0);
  const averageRating = totalTestimonials
    ? userTestimonialPages.reduce((acc, page) => acc + page.testimonials.reduce((sum, t) => sum + t.ratings, 0), 0) / totalTestimonials
    : 0;

  // Process data for the line chart
  const processDataForLineChart = () => {
    const dateMap = new Map();

    userTestimonialPages.forEach(page => {
      page.testimonials.forEach(testimonial => {
        const date = new Date(testimonial.submittedOn).toLocaleDateString();
        if (!dateMap.has(date)) {
          dateMap.set(date, { count: 0, totalRatings: 0 });
        }
        dateMap.get(date).count += 1;
        dateMap.get(date).totalRatings += testimonial.ratings;
      });
    });

    const labels = Array.from(dateMap.keys());
    const values = Array.from(dateMap.values()).map(val => val.totalRatings / val.count);

    return { labels, values };
  };

  const lineChartData = processDataForLineChart();

  // Process data for the daily submissions line chart
  const processDataForDailySubmissions = () => {
    const dateMap = new Map();

    userTestimonialPages.forEach(page => {
      page.testimonials.forEach(testimonial => {
        const date = new Date(testimonial.submittedOn).toLocaleDateString();
        if (!dateMap.has(date)) {
          dateMap.set(date, 0);
        }
        dateMap.set(date, dateMap.get(date) + 1);
      });
    });

    const labels = Array.from(dateMap.keys());
    const values = Array.from(dateMap.values());

    return { labels, values };
  };

  const dailySubmissionsData = processDataForDailySubmissions();
  const handleShowProfileInfo = () => {
    setShowProfileInfo(!showProfileInfo)
  }

  return (
    <main className='px-4 py-2 md:py-0 md:ml-64 mt-2 md:mt-0 md:mr-64'>
      <div onClick={handleShowProfileInfo} className='fixed grid md:hidden cursor-pointer bottom-4 right-4 bg-gray-300 text-black w-12 h-12 items-center justify-center rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
          <path d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
      <h2 className='font-semibold text-2xl'>Stats ✌️</h2>
      {
        loading ? <Loader/>
        :
        <>
        <MagicCard className={`fixed px-3 py-2 grid items-center justify-center shadow-lg shadow-zinc-900 w-52 md:w-60 z-10 top-20 transition-all duration-300 rounded-lg h-52 bg-[#202325] md:bg-transparent border-2 border-zinc-800 ${showProfileInfo ? 'right-0' : '-right-52'} md:right-2`}>
        {/* User Overview */}
        {userInfo && (
          <div className="w-full text-center gap-2 grid items-center justify-center">
            {
              userInfo[0].name && <div className='w-10 h-10 select-none mx-auto rounded-full grid items-center justify-center bg-green-500'>
                {userInfo[0].name.charAt(0).toUpperCase()}
              </div>
            }
            <h2>{userInfo[0].name}</h2>
            <p className='flex items-center gap-1.5 text-sm text-gray-300'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} fill={"none"}>
              <path d="M2 6L8.91302 9.91697C11.4616 11.361 12.5384 11.361 15.087 9.91697L22 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg> {userInfo[0].email}</p>
          </div>
        )}
      </MagicCard>

      {
        userTestimonialPages && userTestimonialPages.length > 0 ?
        <div className='grid mt-4 gap-4 md:grid-cols-2' onClick={() => setShowProfileInfo(false)}>
        <div className='grid items-center gap-2 bg-zinc-800 px-4 py-3 rounded-md'>
          <h3>Average Rating: {averageRating.toFixed(2)}</h3>
          <div className='mx-auto w-full sm:w-40 md:w-52 lg:w-80'>
            <AverageRatingChart averageRating={averageRating} />
          </div>
        </div>
        <div className='mx-auto w-full grid gap-2 bg-zinc-800 px-4 py-3 rounded-md'>
          <h3>Ratings Over Time</h3>
          <RatingOverTimeChart data={lineChartData} />
        </div>
        {/* Daily Submissions Chart */}
        <div className='mx-auto w-full grid gap-2 bg-zinc-800 px-4 py-3 rounded-md'>
          <h3>Daily Submissions</h3>
          <DailySubmissionsChart data={dailySubmissionsData} />
        </div>
        <div className=' mx-auto w-full flex flex-col gap-3 bg-zinc-800 px-4 py-4 rounded-md'>
          {/* Quick Actions */}
          <div className="flex gap-2">
            <Link  to="/create" className="bg-zinc-700 px-3 rounded-md py-2 hover:bg-zinc-600 h-fit">Create new page</Link>
            <Link  to="/testimonials" className="bg-zinc-700 px-3 rounded-md py-2 hover:bg-zinc-600 h-fit">Manage Testimonials</Link>
          </div>

          {/* Recent Testimonials */}
          <div className='flex flex-col gap-3'>
            <h3>Recently pages</h3>
            {userTestimonialPages.slice(0, 5).map(testimonial => (
              <div key={testimonial._id}>
                <Link to={`/testimonials/${testimonial._id}`} className='line-clamp-2 text-sm px-3 py-1 rounded-md text-gray-300 bg-zinc-700'>{testimonial.description}</Link>
              </div>
            ))}
            <p>Total Pages: {userTestimonialPages.length}</p>
          </div>
        </div>
      </div>
      :
      <div className='my-2 text-lg py-1'>
        <h2 className='text-gray-400'>Start creating testimonial pages to see stats</h2>
      </div>
      }
      </>
      }
    </main>
  );
};

export default Dashboard;
