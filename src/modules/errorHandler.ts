import { Prisma } from "@prisma/client"

export const errorHandler = (e: any) => {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {

    if (e.code === 'P2002') {
      return `Keunikan ${e.meta?.target} sudah ada`
    }

    if (e.code === 'P1008') {
      return `Waktu operasi database habis`;
    }

    return `Terjadi kesalahan pada database ${e.message}`;
  }
}