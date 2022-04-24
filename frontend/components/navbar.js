import Link from 'next/link'

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="relative flex items-center justify-between h-16">
                    <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div class="flex-shrink-0 flex items-center  ">
                            <img className=" h-8 w-auto rounded-full" src="https://korism.com/_upload/news/2018/07/121852/m.jpg" alt="Workflow"/><a className=" text-white px-3  rounded-md text-sm font-medium">K-POP GOT7 </a>
        </div>
        <div className="hidden sm:block sm:ml-6">
          <div className="flex space-x-4">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link href="/"><a className=" text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">HOME</a></Link>

            <Link href="/shop"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Product</a></Link>

            <Link href="/admin"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Admin</a></Link>
            
            <Link href="https://sites.google.com/site/got7bynadearmarkku/prawati-swn-taw"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Profile1</a></Link>
            
            <Link href="https://www.youtube.com/c/GOT7stillalive"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Youtube</a></Link>

            <Link href="/contact"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a></Link>
            {/* <Link href="/test"><a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Test</a></Link> */}
          </div>
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
       
        <div className="ml-3 relative">
          <div>
            <button type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <a href="/logout" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium bg-gray-900 ">Logout</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
    );
}





    // <div>
    //     <Link href="/"><a> Home </a></Link> |
    //     <Link href="/register"><a> Register </a></Link>  |
    //     <Link href="/login"><a> Login </a></Link> |
    //     <Link href="/profile"><a> Profile </a></Link> | 
    //     <Link href="/foo"><a> Foo </a></Link> | 
    //     <Link href="/getConfig"><a> Config </a></Link> | 
    //     <Link href="/logout"><a> Logout </a></Link> 
    // </div>


export default Navbar;