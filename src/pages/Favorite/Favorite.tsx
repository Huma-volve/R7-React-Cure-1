import favIcon from '../../../public/favorite.svg'


const Favorite = () => {
  return (
    <section className="min-h-screen">
        <div className="container mx-auto">
            <div className="flex justify-center relative top-25 items-center">
                <img src={favIcon} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Favorite