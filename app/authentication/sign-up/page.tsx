export default function SignUpForm() {
  return (
    <div className="lg:min-h-screen">
      <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:px-16 lg:py-12">
        <div className="w-1/3">
          <form
            action="http://localhost:3000/authentication/sign-up"
            method="POST"
            className="mt-16 flex flex-col gap-6"
          >
            <div>
              <label
                htmlFor="UserName"
                className="block text-sm font-medium text-gray-700"
              >
                User Name
              </label>

              <input
                type="text"
                id="UserName"
                name="username"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md"
              />
            </div>

            <div>
              <label
                htmlFor="Password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                type="password"
                id="Password"
                name="password"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-md"
              />
            </div>

            <div className="sm:flex flex-col sm:items-center sm:gap-4">
              <button
                type="submit"
                className="inline-block shrink-0 rounded-md border border-black bg-black px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-black"
              >
                Create an account
              </button>

              <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                Already have an account?
                <a
                  href="/authentication/log-in"
                  className="ml-2 text-gray-700 underline"
                >
                  Log in
                </a>
                .
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
