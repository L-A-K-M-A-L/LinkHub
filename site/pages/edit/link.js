import UserHeader from '@/components/UserHeader';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Links = () => {
  const [links, setLinks] = useState([{ url: '', title: '' }]);
  const router = useRouter();

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    const linkToUpdate = { ...updatedLinks[index], [field]: value };
    updatedLinks[index] = linkToUpdate;
    setLinks(updatedLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { url: '', title: '' }]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const saveLinks = (e) => {
    e.preventDefault();
    
    // Prepare the links data with both `url` and `title` from each link object
    const linksData = links.map((link) => ({
      url: link.url,
      title: link.title,
    }));
  
    fetch(`http://localhost:8080/save/links`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkHubToken'),
        links: linksData,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'error') {
          return toast.error(response.error);
        }
        toast.success('Links saved successfully');
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  

  useEffect(() => {
    if (!localStorage.getItem('LinkHubToken')) {
      router.push('/login');
      return;
    }

    fetch('http://localhost:8080/load/links', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        tokenMail: localStorage.getItem('LinkHubToken')
      })
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 'error') {
          toast.error(response.error || 'Failed to load links');
        } else {
          setLinks(response.links || []);
        }
      })
      .catch((err) => {
        console.error('Error loading links:', err);
        toast.error('Failed to load links');
      });
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <UserHeader />
        <main className="flex flex-col items-center py-8">
          <section className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-center font-bold text-3xl text-gray-700 mb-8">Add or Edit Your Links</h1>
            <form onSubmit={saveLinks}>
              {links.map((link, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-6"
                >
                  <div className="flex-1">
                    <label className="block text-gray-600 font-medium mb-2">URL:</label>
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-600 font-medium mb-2">Title:</label>
                    <input
                      type="text"
                      value={link.title}
                      onChange={(e) => handleLinkChange(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="mt-4 md:mt-7 px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600 transition duration-200 w-full md:w-auto"
                >
                  Add Link
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition duration-200 w-full md:w-auto"
                >
                  Save
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
  
}  

export default Links;
