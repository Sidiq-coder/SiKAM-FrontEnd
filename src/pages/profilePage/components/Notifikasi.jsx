import { MoreVertical } from "lucide-react";

export const Notifikasi = () => {
  const notifikasiBaru = [
    {
      id: 1,
      nama: 'Admin',
      aksi: 'menanggapi laporan Anda',
      waktu: '27 Jun, 09:20',
      sejak: '2 jam lalu',
    },
    {
      id: 2,
      nama: 'Admin',
      aksi: 'meninjau laporan Anda',
      waktu: '27 Jun, 09:20',
      sejak: '2 jam lalu',
    },
  ];

  const notifikasiSebelumnya = [
    {
      id: 3,
      nama: 'Admin',
      aksi: 'menanggapi laporan Anda',
      waktu: '27 Jun, 09:20',
      sejak: '2 jam lalu',
    },
    {
      id: 4,
      nama: 'Admin',
      aksi: 'meninjau laporan Anda',
      waktu: '27 Jun, 09:20',
      sejak: '2 jam lalu',
    },
    {
      id: 5,
      nama: 'Admin',
      aksi: 'meninjau laporan Anda',
      waktu: '27 Jun, 09:20',
      sejak: '2 jam lalu',
    },
  ];

  const renderNotifikasi = (data) =>
    data.map((item) => (
      <div key={item.id} className="flex items-center justify-between py-4">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-[#0B4D9B] rounded-full flex items-center justify-center text-white font-bold text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="white">
              <path d="M12 12c2.67 0 8 1.34 8 4v2H4v-2c0-2.66 5.33-4 8-4zm0-2a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2A2A2A]">
              {item.nama} <span className="font-normal text-[#4B5563]">{item.aksi}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{item.waktu}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
          <p className="text-xs text-gray-400">{item.sejak}</p>
          <MoreVertical className="w-4 h-4 text-gray-400" />
        </div>
      </div>
    ));

  return (
    <div className="p-6 bg-white min-h-screen rounded-lg shadow-md w-full mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Notifikasi</h2>
        <button className="text-sm text-blue-500 hover:underline">Tandai semua telah dibaca</button>
      </div>

      {/* Notifikasi Baru */}
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        Baru <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">{notifikasiBaru.length}</span>
      </h3>
      <div>{renderNotifikasi(notifikasiBaru)}</div>

      {/* Notifikasi Sebelumnya */}
      <h3 className="text-sm font-semibold text-gray-600 mt-6 mb-2">
        Sebelumnya <span className="text-xs bg-gray-200 rounded-full px-2 py-0.5 ml-1">{notifikasiSebelumnya.length}</span>
      </h3>
      <div>{renderNotifikasi(notifikasiSebelumnya)}</div>
    </div>
  );
};
