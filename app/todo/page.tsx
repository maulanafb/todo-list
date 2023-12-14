'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import TodoCard from '../components/TodoCard';
import { signIn, useSession } from 'next-auth/react';
import { fetchData } from './action';
import { redirect } from 'next/navigation';


const Todo = ({ todos }:any) => {
  const { data: session } = useSession();
  
  const token = session?.user.accessToken;

  console.log(token);
  const [allTodo, setAllTodo] = useState(todos || []);
  const [newTodo, setNewTodo] = useState('');

  const fetchUserTodos = async () => {
    try {
      const todos = await fetchData(token);
      setAllTodo(todos);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   const addTodo = async (e: any) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}todo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTodo, status: false }),
    });

    if (response.ok) {
      const newTodoData = await response.json();
      console.log('New Todo Data:', newTodoData); // Tambahkan log ini
      setAllTodo((prevTodos: any) => [...prevTodos, newTodoData]);
      setNewTodo(''); // Reset input value to empty string
      fetchUserTodos();
    } else {
      console.error('Failed to add todo:', response.status);
    }
  } catch (error) {
    console.error('Error adding todo:', error);
  }
};



  const deleteTodo = async (id:any) => {
    try {
      // Implement logic to delete a todo
      // Make a DELETE request to your API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}todo/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAllTodo((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error('Failed to delete todo:', response.status);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleTodoStatus = async (id:any) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}todo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: !allTodo.find((todo) => todo.id === id)?.status }),
      });

      if (response.ok) {
        setAllTodo((prevTodos:any) =>
          prevTodos.map((todo:any) =>
            todo.id === id ? { ...todo, status: !todo.status } : todo
          )
        );
      } else {
        console.error('Failed to toggle todo status:', response.status);
      }
    } catch (error) {
      console.error('Error toggling todo status:', error);
    }
  };

  useEffect(() => {
    fetchUserTodos();
  }, [token]);
  // console.log(session?.user.accessToken)
  return (
    <section className='flex flex-col items-center'>
      {/* Header section */}
      <div className='flex items-center justify-center bg-black min-h-[200px] min-w-full'>
        <Image src={'/logo.png'} width={126} height={48} alt='logo' />
      </div>

      {/* Main container */}
      <div className='flex flex-col justify-center items-center'>
        {/* Add todo form */}
        <div className='mb-8'>
          <form onSubmit={addTodo}>
            <div className='flex flex-row justify-center'>
              <input
                type='text'
                onChange={(e) => setNewTodo(e.target.value)}
                value={newTodo}
                placeholder='Tambahkan TodoList kamu hari ini🥰'
                className='text-white focus:outline-none px-4 border-2 border-black mr-2 h-[52px] rounded-[8px] w-full md:w-[736px] bg-bgInput'
              />
              <button className='text-white flex items-center px-4 py-2 bg-darkBlue rounded-[8px]'>
                <span className='mr-1'>Gas</span>
                <Image src={'/add.png'} width={20} height={20} alt='tambah' />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Todo list section */}
      <div className='flex flex-row justify-between px-6 md:px-0 md:w-[820px] '>
        <div className='flex items-center'>
          <div className='font-bold text-[#4EA8DE]'>Semua title todo</div>
          <span className='bg-[#333333] rounded-full text-white px-2 py-1 ml-2'>
            {allTodo.length}
          </span>
        </div>
        <div className='flex items-center'>
          <div className='font-bold text-[#8284FA]'>Todo List Selesai</div>
          <span className='bg-[#333333] rounded-full text-white px-2 py-1 ml-2'>
            {allTodo.filter((todo) => todo.status).length}
          </span>
        </div>
      </div>

      {/* Todo list */}
      {allTodo.length > 0 ? (
        <div className='flex flex-col md:w-[820px] items-center mt-6 px-4 md:px-0 mb-10'>
          {allTodo.map((item) => (
            <TodoCard
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
              onToggleStatus={() => toggleTodoStatus(item.id)}
              onDelete={() => deleteTodo(item.id)}
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mt-16 '>
          <Image src={'/clipboard.png'} width={56} height={56} alt='clipboard' />
          <span className='font-bold mt-4 text-[#808080]'>Todo list kamu kosong 😅</span>
          <span className='mt-1 text-[#808080]'>
            Yuk isi TodoList kamu biar Harimu Makin Produktif 😁
          </span>
        </div>
      )}
    </section>
  );
};



export default Todo;
