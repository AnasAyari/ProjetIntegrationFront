<?php

namespace App\Controller;

use App\Entity\Poster;
use App\Form\PosterType;
use App\Repository\PosterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/poster')]
class PosterController extends AbstractController
{
    #[Route('/posters', name: 'app_poster_index', methods: ['GET'])]
    public function index(PosterRepository $posterRepository , HttpClientInterface $client): Response
    {
        $response = $client->request('GET', 'API_URL');
        $posters = $response->toArray();
        return $this->render('poster/index.html.twig',
        array('posters'=>$posters) 
        /*[
            'posters' => $posterRepository->findAll(),
        ]*/);
    }

    #[Route('/new', name: 'app_poster_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $poster = new Poster();
        $form = $this->createForm(PosterType::class, $poster);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($poster);
            $entityManager->flush();

            return $this->redirectToRoute('app_poster_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('poster/new.html.twig', [
            'poster' => $poster,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_poster_show', methods: ['GET'])]
    public function show(Poster $poster): Response
    {
        return $this->render('poster/show.html.twig', [
            'poster' => $poster,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_poster_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Poster $poster, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(PosterType::class, $poster);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_poster_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('poster/edit.html.twig', [
            'poster' => $poster,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_poster_delete', methods: ['POST'])]
    public function delete(Request $request, Poster $poster, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$poster->getId(), $request->request->get('_token'))) {
            $entityManager->remove($poster);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_poster_index', [], Response::HTTP_SEE_OTHER);
    }
}
